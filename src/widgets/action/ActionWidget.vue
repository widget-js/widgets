<template>
  <div class="action-container" :style="{
    backgroundColor:backgroundColor
  }" v-show="type==1">
    <div class="action-one">
      <div class="action-title">代办事项</div>
      <img class="action-history" src="./images/action_history.svg" alt="">
      <img class="action-add-circle-line" src="./images/action_add_circle_line.svg" alt="">
    </div>

    <div class="action-line"></div>

    <div class="action-two">
      <div class="action-two-one">
        <div class="action-box"></div>
        <div class="action-text">✨欢迎使用桌面组件</div>
      </div>

      <div class="action-two-one">
        <div class="action-box"></div>
        <div class="action-text">长按组件进行设置</div>
      </div>

      <div class="action-two-one">
        <div class="action-box"></div>
        <div class="action-text">点击右下角添加桌面组...</div>
      </div>
    </div>
  </div>

  <div class="action-container" :style="{
    backgroundColor:backgroundColor
  }" v-show="type == 2">
    <div class="action-two-box">
      <div class="action-two-title">添加事项</div>
    </div>

    <div class="action-two-content">
    </div>

    <div class="action-two-bottom">
      <div class="action-cancel"><p style="margin-top: 5%">取消</p></div>
      <div class="action-save"><p style="margin-top: 5%;">保存</p></div>
    </div>

  </div>

  <div class="action-container" :style="{
    backgroundColor:backgroundColor
  }" v-show="type == 3">
    <div class="action-three">
      <div class="action-three-title">历史记录</div>
      <img class="action-close" src="./images/action_close.svg" alt="">
    </div>

    <div class="action-line"></div>

    <div class="action-three-two">
      <div class="action-three-two-one">
        <div class="action-three-box"></div>
        <div class="action-three-text">✨欢迎使用桌面组件</div>
      </div>

      <div class="action-three-two-one">
        <div class="action-three-box"></div>
        <div class="action-three-text">长按组件进行设置</div>
      </div>

      <div class="action-three-two-one">
        <div class="action-three-box"></div>
        <div class="action-three-text">点击右下角添加桌面组...</div>
      </div>
    </div>
  </div>

</template>
<script lang="ts" setup>

import internal from "stream";
import {ref} from "vue";

const props = defineProps({
  backgroundColor: {
    type: String,
  },
})

let type = ref(3);

</script>
<style lang="scss" scoped>
body * {
  background: transparent;
  overflow: hidden;
  margin: 0;
}

.action-container {
  overflow: hidden;
  background-color: #F0F2F5;
  border-radius: 20px;
  height: 100%;
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;

  .action-one {
    width: 100%;
    height: 20%;
    background: #F0F2F5;

    .action-title {
      width: 30%;
      height: 60%;
      font-size: 1.6em;
      font-family: OPPOSans-Bold, OPPOSans;
      font-weight: bold;
      color: #409EFF;
      line-height: 60%;
      -webkit-background-clip: text;
      margin-top: 4%;
      margin-left: 10%;
      padding-top: 5%;
      position: relative;
      display: inline-block;
    }

    .action-history {
      width: 20%;
      height: 60%;
      margin-left: 20%;
      position: relative;
    }

    .action-add-circle-line {
      width: 20%;
      height: 60%;
      position: relative;
    }
  }

  .action-line {
    width: 100%;
    border-top: 1px dashed #DCDFE6;
  }

  .action-two {
    width: 100%;
    height: 80%;
    background: #F0F2F5;

    .action-two-one {
      width: 80%;
      margin-left: 10%;
      background: #FFFFFF;
      height: 20%;
      margin-top: 5%;
      border-radius: 7px 7px 7px 7px;

      .action-box {
        width: 12%;
        height: 60%;
        margin-top: 4%;
        background: #FFFFFF;
        border-radius: 2px 2px 2px 2px;
        opacity: 1;
        border: 1px solid #DCDFE6;
        display: inline-block;
        position: relative;
      }

      .action-text {
        width: 65%;
        height: 60%;
        margin-top: 4%;
        margin-left: 5%;
        font-size: 1.5em;
        position: relative;
        display: inline-block;
        font-weight: bold;
      }

    }

  }

  .action-two-box {
    width: 100%;
    height: 20%;
    background: #F0F2F5;

    .action-two-title{
      width: 100%;
      height: 100%;
      font-size: 1.6em;
      font-family: OPPOSans-Bold, OPPOSans;
      font-weight: bold;
      color: #303133;
      line-height: 60%;
      -webkit-background-clip: text;
      margin-top: 4%;
      padding-top: 5%;
      position: relative;
      display: inline-block;
    }
  }

  .action-two-content {
    width: 89%;
    height: 42.5%;
    margin-left: 5.5%;
    margin-top: 7.65%;
    background: #FFFFFF;
    border-radius: 5px 5px 5px 5px;
  }

  .action-two-bottom {
    width: 90%;
    height: 23.85%;
    margin-top: 6%;
    margin-left: 5%;
    position: relative;

    .action-cancel {
      width: 45%;
      height: 53.5%;
      position: relative;
      background: #DCDFE6;
      float: left;
      border-radius: 5px;
      text-align: center;
    }

    .action-save {
      width: 45%;
      height: 53.5%;
      margin-left: 10%;
      text-align: center;
      position: relative;
      background: #409EFF;
      float: left;
      border-radius: 5px;
    }
  }

  .action-three {
    width: 100%;
    height: 20%;
    background: #F0F2F5;

    .action-three-title {
      width: 50%;
      height: 60%;
      font-size: 1.6em;
      font-family: OPPOSans-Bold, OPPOSans;
      font-weight: bold;
      color: #409EFF;
      line-height: 60%;
      -webkit-background-clip: text;
      margin-top: 4%;
      padding-top: 5%;
      position: relative;
      display: inline-block;
    }

    .action-close {
      width: 20%;
      height: 60%;
      margin-left: 20%;
      position: relative;
    }
  }

  .action-three-two {
    width: 100%;
    height: 80%;
    background: #F0F2F5;

    .action-three-two-one {
      width: 80%;
      margin-left: 10%;
      background: #FFFFFF;
      height: 20%;
      margin-top: 5%;
      border-radius: 7px 7px 7px 7px;
    }

    .action-three-box {
      width: 12%;
      height: 60%;
      margin-top: 4%;
      background: #FFFFFF;
      border-radius: 2px 2px 2px 2px;
      opacity: 1;
      border: 1px solid #DCDFE6;
      display: inline-block;
      position: relative;
    }

    .action-three-text {
      width: 65%;
      height: 60%;
      margin-top: 4%;
      margin-left: 5%;
      font-size: 1.5em;
      position: relative;
      display: inline-block;
      font-weight: bold;
    }
  }

}
</style>
