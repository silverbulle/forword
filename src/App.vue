<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
// import load from "./components/load";
// import Home from "./views/Home";

export default {
  name: "app",
  components: {
    // load,
    // Home,
    // Login,
  },
  
};

</script>

<style>
#app {
  /* font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;  */
  background: #eaeaea;
  background-image:url("@/../static/images/earth.jpg") ;
  position: fixed;
  background-size: 100% 100%;
  width: 100%;
  /* height: 100%;
  background-image: url("/assets/images/login-bg.jpg");
  background-size: cover;
  background-position: center;
  position: relative;  */
}
@import "./static/css/main.css";
@import "./static/iconfont/iconfont.css";
</style>
