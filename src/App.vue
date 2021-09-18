<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> | 
    <router-link to="/encoding-transform">文件编码批量转换</router-link>
  </div>
  <br/>
  <div>
  <router-view/>
  </div>
</template>

<script>
import {ensureLoginAsync} from './utils/user'

export default {
  async mounted() {
    console.log("calling async App.vue::mounted()");
    console.log("store:")
    console.dir(this.$store);
    ensureLoginAsync(this.$store);
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
