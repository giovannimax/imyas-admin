<template>
  <div class="main-cont d-flex flex-wrap">
    <div v-for="(item, idx) in artists" :key="idx" @click="$router.push('/artists/' + item.id)" class="d-flex flex-column align-items-center artists-item">
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
        this.$api('artists')
        .find()
        .then(res => {
            this.artists = res.data 
        }).catch(error => {
            console.log(error);
        });
      },
      getStatus(stat) {
        switch(stat) {
          case 0 : return 'Pending'
          case 1 : return 'Active'
          case 2 : return 'Cancelled'
          case 3 : return 'Completed'
        }
      },
      getUser(model, id) {
        return this.$api(model)
        .findOne(id)
        .then(res => {
          return res.data
        }).catch(error => {
            console.log(error);
        });
      },
      goView(id) {
        this.$router.push("/bookings/" + id);
      },
      toggleView(idx) {
        this.bookings[idx].show = !this.bookings[idx].show;
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