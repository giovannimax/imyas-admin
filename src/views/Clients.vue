<template>
  <div class="main-cont d-flex flex-wrap">
    <div v-for="(item, idx) in artists" :key="idx" @click="$router.push('/clients/' + item.id)" class="d-flex flex-column align-items-center artists-item">
        <img class="img-artists" :src="item.meta.photoUrl" />
        <span>{{item.meta.fname || item.meta.name}}</span>
    </div>
  </div>
</template>
<script>
export default {
    data() {
      return {
        artists: []
      }
    },
    methods: {
      getBookings() {
        this.$api('users')
        .find()
        .then(res => {
            res.data.forEach(el => {
                console.log(el);
                if(el.meta.role === 'client') {
                    this.artists.push(el);
                }
            });
        }).catch(error => {
            console.log(error);
        });
      }
    },
    mounted() {
      this.getBookings();
    }
}
</script>
<style>
.img-prof {
  max-width: 35px;
  border-radius: 50%;
}
.img-artists {
  max-width: 80px;
}
.artists-item {
  width: 20%;
  cursor: pointer;
}
</style>