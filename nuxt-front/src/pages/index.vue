<template>
  <section>
    <div class="text-4xl font-headings text-primary bg-primary">
      A
    </div>
    <div class="bg-secondary">
      B
    </div>
    <div class="bg-tertiary">
      C
    </div>
  </section>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Hind+Madurai:wght@300&family=Lora:ital@1&family=Montserrat:wght@700&display=swap');
:root {
  --primary: #373A36; /* Dark brown */
  --secondary: #E6E2DD; /* Light grey */
  --tertiary: #C38571; /* Light orange */
  --quaternary: #45A0A5; /* Light blue */
}
@media (prefers-color-scheme: light) {
  :root {
    --primary: #E6E2DD; /* Light grey */
    --secondary: #373A36; /* Dark brown */
    --tertiary: #935946; /* Dark orange */
    --quaternary: #31979D; /* Medium blue */
  }
}
</style>
