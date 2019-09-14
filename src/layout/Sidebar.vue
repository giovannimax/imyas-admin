<template>
  <nav class="col-md-2 d-none d-md-block bg-light sidebar">
      <div class="sidebar-sticky">
        <ul class="nav flex-column align-items-start">
          <li class="nav-item">
            <a href="#" @click="goTo('')" :class="$route.path === '/' ? 'nav-link d-flex align-items-center py-2 px-0 active' : 'nav-link d-flex align-items-center py-2 px-0'">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home mr-2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            Dashboard</a>
          </li>
          <li class="nav-item" v-for="(item, idx) in $store.state.ui.sidebar" :key="idx">
            <a :class="$route.path.includes(item.route) ? 'nav-link d-flex align-items-center py-2 px-0 active' : 'nav-link d-flex align-items-center py-2 px-0'" href="#" v-html="item.icon + item.label" @click="goTo(item.route)"></a>
          </li>
        </ul>
      </div>
    </nav>
</template>
<script>
export default {
    methods: {
      goTo(route){
          this.$router.push('/' + route);
      }
    }
}
</script>