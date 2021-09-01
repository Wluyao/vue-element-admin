<template>
  <div id="container">4554</div>
</template>

<script>
import { loadMicroApp, registerMicroApps, start } from 'qiankun'
export default {
  data() {
    return {}
  },
  mounted() {
    this.loadSubApp()
    // this.loadSubApps()
  },
  methods: {
    loadSubApp() {
      loadMicroApp({
        name: 'reactApp',
        entry: '//localhost:8090',
        container: '#container'
      })
    },
    loadSubApps() {
      registerMicroApps([
        {
          name: 'reactApp',
          entry: '//localhost:8090',
          container: '#container',
          activeRule: '/#/micro-app'
        }
      ])
      start()
    }
  }
}
</script>

<style lang="scss" scoped></style>
