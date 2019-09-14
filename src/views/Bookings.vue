<template>
  <div class="main-cont">
    <table class="table table-hover">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Artist</th>
          <th scope="col">Client</th>
          <th scope="col">Date Added</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, idx) in bookings">
          <tr :key="idx">
            <th scope="row">{{item.id}}</th>
            <td><img class="img-prof mr-2" :src="item.artist.meta.photoUrl"/>{{item.artist.meta.fname || item.artist.meta.name}}</td>
            <td><img class="img-prof mr-2" :src="item.user.meta.photoUrl"/>{{item.user.meta.fname || item.user.meta.name}}</td>
            <td>{{$dfns(new Date(item.date), 'MMM-dd-yy')}}</td>
            <td>
              <a class="mx-1 text-primary" href="#" @click="toggleView(idx)" title="View">
                <svg id="i-eye" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="25" height="25" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                  <circle cx="17" cy="15" r="1" />
                  <circle cx="16" cy="16" r="6" />
                  <path d="M2 16 C2 16 7 6 16 6 25 6 30 16 30 16 30 16 25 26 16 26 7 26 2 16 2 16 Z" />
                </svg>
              </a>
              <a class="mx-1 text-primary" @click="cancel(item.id)" href="#" title="Cancel">
                <svg class="mx-1 text-danger" id="i-ban" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                  <circle cx="16" cy="16" r="14" />
                  <path d="M6 6 L26 26" />
                </svg>
              </a>
            </td>
          </tr>
          <tr class="bookmoreinfo" v-show="item.show" :key="idx + 50" :style="{'background': 'rgba(0, 0, 0, 0.075)'}">
            <td colspan="5">
            <b-collapse id="collapse-4" v-model="item.show" class="mt-2">
              <div class="w-100">
                <h5>Details</h5>
                <hr class="m-0">
                <div class="d-flex justify-content-between container my-2">
                  <span><b>Date:</b> {{$dfns(new Date(item.meta.date), 'MMMM dd, yyyy')}}</span>
                  <span><b>Time:</b> {{$dfns(new Date(item.meta.time), 'hh:mm a')}}</span>
                  <span><b>Status:</b> {{getStatus(item.status)}}</span>
                </div>
              </div>
              <div class="w-100">
                <h5 class="mt-3">Package</h5>
                <hr class="m-0">
                <div class="d-flex justify-content-between container my-2">
                  <span><b>Event:</b> {{item.meta.pack.event}}</span>
                  <span><b>Pax:</b> {{item.meta.pack.pax}}</span>
                  <span><b>Price:</b> {{item.meta.pack.price}}</span>
                </div>
              </div>
              <div class="w-100">
                <h5 class="mt-3">Artist</h5>
                <hr class="m-0">
                <div class="d-flex justify-content-between container my-2">
                  <span><b>Name:</b> <img class="img-prof mx-2" :src="item.artist.meta.photoUrl"/>{{item.artist.meta.fname || item.artist.meta.name}}</span>
                  <span><b>Type:</b> {{item.artist.meta.type}}</span>
                  <span><b>Email:</b> {{item.artist.meta.email}}</span>
                  <a href="#" @click="$router.push('/artists/' + item.artistId)">Show More</a>
                </div>
              </div>
              <div class="w-100">
                <h5 class="mt-3">Client</h5>
                <hr class="m-0">
                <div class="d-flex justify-content-between container my-2">
                  <span><b>Name:</b> <img class="img-prof mx-2" :src="item.user.meta.photoUrl"/>{{item.user.meta.fname || item.user.meta.name}}</span>
                  <span><b>Email:</b> {{item.user.meta.email}}</span>
                  <a href="#" @click="$router.push('/clients/' + item.userId)">Show More</a>
                </div>
              </div>
            </b-collapse>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
    data() {
      return {
        bookings: []
      }
    },
    methods: {
      getBookings() {
        this.$api('bookings')
        .find()
        .then(res => {
          this.bookings = [];
          //this.bookings = res.data
          res.data.forEach(async item => {
            let doc = {
              ...item,
              artist: '',
              user: '',
              show: false
            }
            let artist = await this.getUser('artists',item.artistId);
            let client = await this.getUser('users',item.userId);   
            doc.artist = artist;
            doc.user = client;
            console.log(doc);
            this.bookings.push(doc);
          });
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
</style>