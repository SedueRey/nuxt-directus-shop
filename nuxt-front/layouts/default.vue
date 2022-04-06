<template>
  <main class="page">
    <Head>
      <Style type="text/css" :children="css"></Style>
    </Head>
    <slot />
  </main>
</template>

<script setup>
const css = projectCss();
</script>

<style lang="scss">
body {
  @apply bg-primary;
}
.page {
  @apply container mx-auto px-4;
}
</style>
