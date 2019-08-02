<template>
  <div class="menu-menu">
    <sidebar-menu :menu=menu @item-click="onItemClick" :collapsed=collapsed @collapse="onCollapse"/>
  </div>
</template>

<script>
export default {
  name: 'SideMenu',
  computed: {
    menu () {
      return this.$store.MenuStore.getters.getMenu
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
