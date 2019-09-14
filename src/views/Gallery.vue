<template>
<div class="row">
    <div class="col" v-for="(img, idx) in images" :key="idx" @click="showLightbox(img.name)">
        <div class="portfolio-item" :style="`background: url('${img.name}') no-repeat center center / cover`"></div>
    </div>
    <lightbox id="mylightbox"
    ref="lightbox"
    :images="images"
    :timeoutDuration="5000"
></lightbox>
</div>
</template>
<script>
export default {
    props: {
        images: {
            type: Array,
            required: true
        }
    },
    methods: {
        showLightbox(imageName) {
            this.$refs.lightbox.show(imageName);
        }
    }
}
</script>
<style>
.portfolio-item {
  width: 100%;
  height: 200px;
  cursor: pointer;
}
</style>