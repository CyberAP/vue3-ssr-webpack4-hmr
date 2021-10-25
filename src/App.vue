<template>
  <div class="app">
    <nav>
      <ul>
        <li>
          <router-link :to="{ name: 'HOME' }"> Home </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ABOUT' }"> About </router-link>
        </li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  metaInfo() {
    return {
      title: "My Example App",
    };
  },
};
</script>

<style>
body {
  font-size: 25px;
}

.router-link-active {
  font-weight: bold;
}
</style>
