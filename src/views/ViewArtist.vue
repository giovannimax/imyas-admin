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
               <p>Status: {{user.active ? 'Active' : 'Disabled'}} </p>
                <b-button v-if="user.active" variant="danger" @click="deactivate">Disable</b-button>
                <b-button v-else variant="primary" @click="deactivate">Enable</b-button>
          </div>
      </div>
      <div class="row mt-5" v-if="artist">
          <div class="col">
              <h4>Packages</h4>
              <hr/>
          </div>
      </div>
      <div class="row" v-if="packages">
          <table class="table table-hover">
            <thead class="thead-dark">
                <tr>
                <th scope="col">#</th>
                <th scope="col">Event</th>
                <th scope="col">Pax</th>
                <th scope="col">Price</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, idx) in packages" :key="idx">
                    <td>{{idx+1}}</td>
                    <td>{{item.event}}</td>
                    <td>{{item.pax}}</td>
                    <td><b>PHP</b> {{item.price}}</td>
                </tr>
            </tbody>
          </table>
      </div>
       <div class="row mt-5">
          <div class="col">
              <h4>Portfolio</h4>
              <hr/>
          </div>
      </div>
      <Gallery :images="images" v-if="images"/>
  </div>
</template>
<script>
import Gallery from './Gallery'
export default {
  components: {
    Gallery
  },
    data() {
      return {
        artist: null,
        packages: null,
        images: [],
        user: null
      }
    },
    methods: {
      getUser(model, id) {
        this.$api(model)
        .findOne(id)
        .then(res => {
         this.artist = res.data;
         this.getPackages();
         this.getPortfolio();
         this.getUsers();
        }).catch(error => {
            console.log(error);
        });
      },
      getUsers() {
        this.$api('users')
        .findOne(this.artist.userId)
        .then(res => {
         this.user = res.data;
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
       getPortfolio() {
             let docs = {
                "userId_eq": this.artist.userId
            }
            this.$api('portfolios')
            .find(docs)
            .then(res => {
              this.images = [];
                res.data[0].pictures.forEach((element, idx) => {
                  let doc = {
                    name: this.$config.api.url + element.url,
                    url: element.url
                  }
                  this.images.push(doc);
              });
            }).catch(error => {
               console.log(error);
            });
        },
        deactivate() {
          let docs = {
            '_id': this.artist.userId,
            'active': !this.user.active
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
     this.getUser('artists', this.$route.params.id)
    }
}
</script>
<style>
.artist-img-prof {
  width: 300px;
  border-radius: 10px;
}
</style>