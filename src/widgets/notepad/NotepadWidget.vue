<script>
export default {
  data() {
    return {
      title: '记事本',
      content: '你可以使用&nbsp;disabled&nbsp;属性来定义按钮是否被禁用。<br />使用&nbsp;disabled&nbsp;属性来控制按钮是否为...',
      time: '2022/10/27 15:04',
    }
  },
  methods: {},
}
</script>

<template>
  <div class="notepad-container">
    <div class="notepad-one">
      <div class="notepad-title">
        记事本
      </div>
      <div class="notepad-add">
        <span class="mgc_add_circle_line" />
      </div>
    </div>

    <div class="notepad-line" />

    <div class="notepad-content">
      你可以使用 disabled 属性来定义按钮是否被禁用。 使用 disabled 属性来控制按钮是否为...
    </div>

    <div class="notepad-two">
      <div class="notepad-left">
        <span class="mgc_left_line" />
      </div>
      <div class="notepad-two-time">
        2022/10/27 15:04
      </div>
      <div class="notepad-left">
        <span class="mgc_right_line" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
body * {
  background: transparent;
  overflow: hidden;
  margin: 0;
}

.notepad-container {
  overflow: hidden;
  background-color: #F0F2F5;
  border-radius: 20px;
  height: 100%;
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;

  .notepad-one {
    width: 100%;
    height: 23%;
    background: #FDD621;
  }

  .notepad-title {
    width: 60%;
    height: 60%;
    text-align: left;
    font-size: 1.6em;
    font-weight: bold;
    color: #FFFFFF;
    line-height: 60%;
    -webkit-background-clip: text;
    margin-top: 4%;
    padding-top: 5%;
    position: relative;
    display: inline-block;
  }

  .notepad-add {
    width: 18%;
    height: 60%;
    position: relative;
  }

  .notepad-line {
    width: 100%;
    border-top: 1px dashed #AA9222;
    margin-top: 2%;
  }

  .notepad-content {
    width: 90%;
    height: 60%;
    margin-top: 4%;
    margin-left: 5%;
  }

  .notepad-two {
    width: 100%;
    height: 9%;
    margin-bottom: 2%;

    .notepad-left {
      width: 9%;
      height: 100%;
      position: relative;
    }

    .notepad-two-time {
      width: 52.5%;
      height: 100%;
      line-height: 100%;
      padding-top: 2.2%;
      position: relative;
      display: inline-block;
    }

    .notepad-right {
      width: 9%;
      height: 100%;
      position: relative;
    }
  }
}
</style>
