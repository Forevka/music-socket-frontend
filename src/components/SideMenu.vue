<template>
  <div class="menu-menu">
    <sidebar-menu :menu=menu @item-click="onItemClick" :collapsed=collapsed @collapse="onCollapse" width="300px" widthCollapsed="50px">
      <span slot="collapse-icon"></span>
    </sidebar-menu>
  </div>
</template>

<script>
import store from '../stores/index'

export default {
  name: 'SideMenu',
  computed: {
    menu () {
      console.log(store)
      return store.getters.getMenu
    },
    collapsed () {
      return true
    }
  },
  methods: {
    onCollapse (collapsed) {
      console.log('on collaps')
    },
    onItemClick (event, item) {
      console.log('on item click')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.v-sidebar-menu .collapse-btn {
  visibility: hidden;
}
</style>
