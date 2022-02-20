<template>
  <SmartDevices/>
</template>

<script>
document.title = 'Smart Devices';
import SmartDevices from './components/SmartDevices.vue'

export default {
  name: 'App',
  components: {
    SmartDevices
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

  body {
    margin: 0;
  }
</style>
