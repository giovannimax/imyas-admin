<template>
  <div class="main-cont">
      <div class="row" v-if="artist">
          <div>
              <img class="artist-img-prof" :src="artist.meta.photoUrl"/>
          </div>
          <div class="col">
              <p>Name: {{artist.meta.fname || artist.meta.name}} </p>
               <p>Email: {{artist.meta.email}} </p>
               <p>Phone: {{artist.meta.phone}} </p>
                <p>Status: {{artist.active ? 'Active' : 'Disabled'}} </p>
                <b-button v-if="artist.active" variant="danger" @click="deactivate">Disable</b-button>
                <b-button v-else variant="primary" @click="deactivate">Enable</b-button>
          </div>
      </div>
  </div>
</template>
<script>
export default {
    data() {
      return {
        artist: null,
        packages: null,
        photos: '',
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
              id: item.id,
              artist: '',
              user: '',
              date: ''
            }
            let artist = await this.getUser('artists',item.artistId);
            let client = await this.getUser('users',item.userId);    
            doc.artist = artist.meta.fname || artist.meta.name;
            doc.artistImg = artist.meta.photoUrl || '';
            doc.user = client.meta.fname || client.meta.name;
            doc.userImg = client.meta.photoUrl || '';
            doc.date = item.date;
            console.log(doc)
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
        this.$api(model)
        .findOne(id)
        .then(res => {
         this.artist = res.data;
        }).catch(error => {
            console.log(error);
        });
      },
      getPackages() {
          let doc = {
              'userId' : this.artist.userId
          }
        this.$api('packages')
        .find(doc)
        .then(res => {
         this.packages = res.data[0].meta.packages;
        }).catch(error => {
            console.log(error);
        });
      },
      deactivate() {
          let docs = {
            '_id': this.artist.userId,
            'active': !this.artist.active
          }
            this.$api('users')
            .save(docs)
            .then(res => {
              this.getUser('artists', this.$route.params.id)
                console.log(res.data);
            }).catch(error => {
               console.log(error);
            });
        },
    },
    mounted() {
     this.getUser('users', this.$route.params.id)
    }
}
</script>
<style>
.artist-img-prof {
  width: 300px;
  border-radius: 10px;
}
</style>