<script setup lang="ts">
const licenseText = `MIT License

Copyright (c) 2025 Nuxt UI Templates

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`

useSeoMeta({
  title: 'Licencja (MIT)',
  description: 'Pełna treść licencji MIT i informacja o prawach autorskich.'
})
</script>

<template>
  <UContainer class="py-10">
    <div class="mx-auto max-w-3xl space-y-6">
      <div class="space-y-2">
        <h1 class="text-2xl font-semibold">
          Licencja
        </h1>
        <p class="text-sm text-muted">
          W każdej kopii kodu (lub istotnej części) musi pozostać informacja o prawach autorskich oraz pełna treść licencji MIT.
        </p>
      </div>

      <UCard class="w-full ring-1 ring-default">
        <pre class="whitespace-pre-wrap wrap-break-word text-sm leading-6">{{ licenseText }}</pre>
      </UCard>
    </div>
  </UContainer>
</template>
