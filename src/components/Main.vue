<template>
  <div>
    <H1>Main page</H1>
    <router-link :to="{name: 'page1'}">
      Page1
    </router-link>
    <router-link :to="{name: 'page2'}">
      Page2
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Main'
};
</script>
