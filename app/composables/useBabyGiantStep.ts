export type BabyStepRow = {
  j: bigint
  value: bigint
}

export type GiantStepRow = {
  i: bigint
  value: bigint
}

export type BabyGiantInputs = {
  g: bigint
  b: bigint
  p: bigint
}

export type BabyGiantResult =
  | {
      ok: true
      x: bigint
      m: bigint
      babySteps: BabyStepRow[]
      giantSteps: GiantStepRow[]
      match: { i: bigint, j: bigint, value: bigint }
    }
  | {
      ok: false
      error: string
      m?: bigint
      babySteps?: BabyStepRow[]
      giantSteps?: GiantStepRow[]
    }

function mod(a: bigint, m: bigint) {
  const r = a % m
  return r >= 0n ? r : r + m
}

function gcd(a: bigint, b: bigint) {
  let x = a < 0n ? -a : a
  let y = b < 0n ? -b : b
  while (y !== 0n) {
    ;[x, y] = [y, x % y]
  }
  return x
}

export function modPow(base: bigint, exp: bigint, modulus: bigint) {
  if (modulus <= 0n) throw new Error('modPow: modulus must be > 0')
  if (exp < 0n) throw new Error('modPow: negative exponent not supported (use inverse)')

  let b = mod(base, modulus)
  let e = exp
  let result = 1n

  while (e > 0n) {
    if (e & 1n) result = (result * b) % modulus
    b = (b * b) % modulus
    e >>= 1n
  }
  return result
}

function egcd(a: bigint, b: bigint): { g: bigint, x: bigint, y: bigint } {
  let oldR = a
  let r = b
  let oldS = 1n
  let s = 0n
  let oldT = 0n
  let t = 1n

  while (r !== 0n) {
    const q = oldR / r
    ;[oldR, r] = [r, oldR - q * r]
    ;[oldS, s] = [s, oldS - q * s]
    ;[oldT, t] = [t, oldT - q * t]
  }

  return { g: oldR, x: oldS, y: oldT }
}

export function modInverse(a: bigint, modulus: bigint) {
  const aa = mod(a, modulus)
  const { g, x } = egcd(aa, modulus)
  if (g !== 1n) return null
  return mod(x, modulus)
}

function bigintSqrtFloor(n: bigint) {
  if (n < 0n) throw new Error('sqrt: n must be >= 0')
  if (n < 2n) return n

  // Integer Newton method.
  let x0 = n
  let x1 = (x0 + n / x0) >> 1n
  while (x1 < x0) {
    x0 = x1
    x1 = (x0 + n / x0) >> 1n
  }
  return x0
}

export function bigintSqrtCeil(n: bigint) {
  const f = bigintSqrtFloor(n)
  return f * f === n ? f : f + 1n
}

function isProbablePrime(n: bigint) {
  if (n < 2n) return false
  if (n === 2n || n === 3n) return true
  if (n % 2n === 0n) return false

  // Write n-1 as d*2^s with d odd.
  let d = n - 1n
  let s = 0n
  while ((d & 1n) === 0n) {
    d >>= 1n
    s++
  }

  const bases = [2n, 3n, 5n, 7n, 11n, 13n, 17n]
  for (const a of bases) {
    if (a >= n - 2n) continue
    let x = modPow(a, d, n)
    if (x === 1n || x === n - 1n) continue
    let cont = false
    for (let r = 1n; r < s; r++) {
      x = (x * x) % n
      if (x === n - 1n) {
        cont = true
        break
      }
    }
    if (cont) continue
    return false
  }
  return true
}

export function babyStepGiantStep({ g, b, p }: BabyGiantInputs): BabyGiantResult {
  if (p <= 1n) return { ok: false, error: 'Moduł P musi być > 1.' }
  if (g <= 0n || b <= 0n) return { ok: false, error: 'G i B muszą być dodatnie.' }

  const gg = mod(g, p)
  const bb = mod(b, p)
  if (gg === 0n) return { ok: false, error: 'G ≡ 0 (mod P) nie jest poprawną bazą.' }
  if (bb === 0n) return { ok: false, error: 'B ≡ 0 (mod P) nie ma sensu w grupie multiplikatywnej.' }

  const gGcd = gcd(gg, p)
  if (gGcd !== 1n) {
    return {
      ok: false,
      error: `Nie można pracować w Z_P^*: gcd(G, P) = ${gGcd.toString()} ≠ 1, więc G nie ma odwrotności modulo P.`
    }
  }

  if (!isProbablePrime(p)) {
    return {
      ok: false,
      error: 'P nie jest liczbą pierwszą (test Miller–Rabina wykrył złożoność). Ten wariant wizualizacji zakłada P pierwsze, bo używa n = P−1.'
    }
  }

  // For Z_p^*, order is p-1 (when p is prime). We still use p-1 as a practical default.
  const n = p - 1n
  const m = bigintSqrtCeil(n)

  const babySteps: BabyStepRow[] = []
  const table = new Map<string, bigint>()

  // Baby steps: g^j
  let acc = 1n
  for (let j = 0n; j < m; j++) {
    const value = acc
    babySteps.push({ j, value })
    const key = value.toString()
    // Keep the smallest j for a given value.
    if (!table.has(key)) table.set(key, j)
    acc = (acc * gg) % p
  }

  // Compute g^{-m} mod p
  const gm = modPow(gg, m, p)
  const invGm = modInverse(gm, p)
  if (!invGm) {
    const d = gcd(gm, p)
    return {
      ok: false,
      error: `Nie istnieje odwrotność modularna dla G^m mod P, bo gcd(G^m, P) = ${d.toString()} ≠ 1.`,
      m,
      babySteps
    }
  }

  const giantSteps: GiantStepRow[] = []
  let gamma = bb
  for (let i = 0n; i < m; i++) {
    const value = gamma
    giantSteps.push({ i, value })

    const hit = table.get(value.toString())
    if (hit !== undefined) {
      const x = i * m + hit
      return {
        ok: true,
        x,
        m,
        babySteps,
        giantSteps,
        match: { i, j: hit, value }
      }
    }

    gamma = (gamma * invGm) % p
  }

  return {
    ok: false,
    error: `Nie znaleziono dopasowania w przeszukanym zakresie i=0..${(m - 1n).toString()}, j=0..${(m - 1n).toString()} (czyli x w [0, ${(m * m - 1n).toString()}]).`,
    m,
    babySteps,
    giantSteps
  }
}

