<template>
  <div class="menu-menu">
    <sidebar-menu :menu=menu />
  </div>
</template>

<script>
export default {
  name: 'SideMenu',
  computed: {
    menu () {
      console.log(this)
      return this.$store.MenuStore.getters.getMenu
    }
  }
}
</script>
