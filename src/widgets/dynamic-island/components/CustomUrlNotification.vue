<template>
  <div class="custom-url-notification">
    <iframe :src="url" width="350" allowfullscreen="false" frameborder="0"/>
    <div class="mask" v-show="mask"/>
  </div>
</template>

<script>

export default {
  name: "CustomUrlNotification",
  props: {
    url: {
      type: String
    },
    mask: {
      type: Boolean
    }
  },
  setup() {
    return {}
  }
}
</script>

<style scoped>
iframe {

}

.mask {
  position: absolute;
  width: 350px;
  height: 100%;
  top: 0px;
}
</style>
