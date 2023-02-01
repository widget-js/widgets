<template>
  <div class="glitch_container">
    <a class="switcher" href="#" @click="toggleScreen"></a>
    <div class="screen" :class="{glitch: showGlitch}">
      <div class="clock" :class="{ 'is-off': isOff, }"><span class="time"
                                                             :data-time="refContent">{{ refContent }}</span></div>
      <div class="figure"></div>
      <div class="figure-mask"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted} from 'vue';

let isOff = ref(true);
let refContent = ref('');
let showGlitch = ref(true)

let newDate = new Date();
newDate.setDate(newDate.getDate());

onMounted(() => {

  setTimeout(() => {
    isOff.value = false;
  }, 2000)

  setInterval(() => {

    let hours = new Date().getHours();
    let seconds = new Date().getSeconds();
    let minutes = new Date().getMinutes();

    const realTime =
        (hours < 10 ? "0" : "") +
        hours +
        " : " +
        (minutes < 10 ? "0" : "") +
        minutes +
        " : " +
        (seconds < 10 ? "0" : "") +
        seconds;

    refContent.value = realTime;

  }, 1000)

})

function toggleScreen(e) {
  e.preventDefault();
  showGlitch.value = !showGlitch.value;
}

// setTimeout(second_passed, 2000);
//
// $(".switcher").on("click", function (e) {
//   e.preventDefault();
//   $(".screen").toggleClass("glitch");
// });
//

// export default {
//     name: "GlitchWidget",
// }
</script>

<style lang="scss" scoped>

.glitch_container {
  color: #FFFFFF;
}

a.switcher {
  display: block;
  position: fixed;
  text-decoration: none;
  z-index: 999999999999;
  right: 10px;
  bottom: 10px;
  width: 16px;
  height: 16px;
  background: transparent;
  border: 2px solid #fff;
  border-radius: 50%;
  opacity: 0.15;
  transition: opacity 0.15s;
}

a.switcher:hover {
  opacity: 1;
}

a.switcher:before {
  display: block;
  content: '';
  position: absolute;
  border-radius: 4px;
  width: 2px;
  height: 5px;
  background: #fff;
  top: 0;
  left: 5px;
}

.screen {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;
  aspect-ratio: 1/0.5;
  text-align: center;
  vertical-align: middle;
  border-radius: 22px;
  background-color: #111111;
}

.figure {
  display: block;
  position: absolute;
  z-index: 1;
  width: 0;
  height: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  border-top: 100px solid #fff;
  border-right: 50px solid transparent;
  border-left: 50px solid transparent;
  border-bottom: 0 solid transparent;
}

.figure:before {
  display: block;
  content: '';
  position: absolute;
  z-index: 99;
  width: 0;
  height: 0;
  top: -97px;
  left: -45px;
  margin: auto;
  border-top: 90px solid #111;
  border-right: 45px solid transparent;
  border-left: 45px solid transparent;
  border-bottom: 0 solid transparent;
}

//
//.figure-mask {
//  display: block;
//  position: absolute;
//  z-index: 99;
//  width: 0;
//  height: 0;
//  top: 0;
//  right: 0;
//  bottom: 0;
//  left: 0;
//  margin: auto;
//  border-top: 200px solid transparent;
//  border-right: 100px solid #111;
//  border-left: 100px solid #111;
//  border-bottom: 0 solid transparent;
//}

.clock {
  display: block;
  position: absolute;
  z-index: 9;
  aspect-ratio: 1/0.5;
  text-align: center;
  top: 50%;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  cursor: default;
}

.clock span {
  display: block;
  position: relative;
  font-size: 70px;
  /*line-height: 1;*/
  vertical-align: middle;
}

.clock.is-off {
  -webkit-animation: is-off 2s linear infinite !important;
  animation: is-off 2s linear infinite !important;
}

.glitch:before {
  position: absolute;
  z-index: 999999;
  content: '';
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  -webkit-animation: bg-move 2s linear infinite;
  animation: bg-move 2s linear infinite;
  background-size: 100% 8px;
  background-image: linear-gradient(0, rgba(255, 255, 255, 0.05) 10%, transparent 10%, transparent 50%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.05) 60%, transparent 60%, transparent);
}

.glitch .figure,
.glitch .figure-mask {
  transform: skewX(0deg) scaleY(1);
  -webkit-animation: tr-bag 4s linear infinite;
  animation: tr-bag 4s linear infinite;
}

.glitch .clock {
  transform: skewX(0deg) scaleY(1);
  -webkit-animation: clock-bag 4s linear infinite;
  animation: clock-bag 4s linear infinite;
}

.glitch .clock span:before,
.glitch .clock span:after {
  display: block;
  content: attr(data-time);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  color: #fff;
  background: #111;
  overflow: hidden;
  /*width: 720px;*/
  /*height: 128px;*/
  clip: rect(0, 300px, 0, 0);
}

.glitch .clock span:before {
  left: -2px;
  text-shadow: 2px 0 #00f;
  animation: c2 1s infinite linear alternate-reverse;
}

.glitch .clock span:after {
  left: 3px;
  text-shadow: -2px 0 #f00;
  animation: c1 2s infinite linear alternate-reverse;
}

@media (max-width: 300px) {
  .clock span {
    font-size: 50px;
  }
}

@-webkit-keyframes is-off {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56% {
    opacity: 0;
  }
  57% {
    opacity: 0;
  }
  58% {
    opacity: 1;
  }
  71% {
    transform: scaleY(1) skewX(0deg);
  }
  72% {
    transform: scaleY(3) skewX(-60deg);
  }
  73% {
    transform: scaleY(1) skewX(0deg);
  }
  80% {
    opacity: 1;
  }
  81% {
    opacity: 0;
  }
  84% {
    opacity: 0;
  }
  85% {
    opacity: 1;
  }
  91% {
    transform: scaleX(1) scaleY(1) skewX(0deg);
    color: #fff;
  }
  92% {
    transform: scaleX(1.5) scaleY(0.2) skewX(80deg);
    color: #008000;
  }
  93% {
    transform: scaleX(1) scaleY(1) skewX(0deg);
    color: #fff;
  }
}

@keyframes is-off {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56% {
    opacity: 0;
  }
  57% {
    opacity: 0;
  }
  58% {
    opacity: 1;
  }
  71% {
    transform: scaleY(1) skewX(0deg);
  }
  72% {
    transform: scaleY(3) skewX(-60deg);
  }
  73% {
    transform: scaleY(1) skewX(0deg);
  }
  80% {
    opacity: 1;
  }
  81% {
    opacity: 0;
  }
  84% {
    opacity: 0;
  }
  85% {
    opacity: 1;
  }
  91% {
    transform: scaleX(1) scaleY(1) skewX(0deg);
    color: #fff;
  }
  92% {
    transform: scaleX(1.5) scaleY(0.2) skewX(80deg);
    color: #008000;
  }
  93% {
    transform: scaleX(1) scaleY(1) skewX(0deg);
    color: #fff;
  }
}

@-webkit-keyframes c1 {
  0% {
    clip: rect(2px, 9999px, 36px, 0);
  }
  5% {
    clip: rect(38px, 9999px, 36px, 0);
  }
  10% {
    clip: rect(4px, 9999px, 47px, 0);
  }
  15.000000000000002% {
    clip: rect(22px, 9999px, 17px, 0);
  }
  20% {
    clip: rect(33px, 9999px, 13px, 0);
  }
  25% {
    clip: rect(33px, 9999px, 19px, 0);
  }
  30.000000000000004% {
    clip: rect(6px, 9999px, 24px, 0);
  }
  35.00000000000001% {
    clip: rect(8px, 9999px, 2px, 0);
  }
  40% {
    clip: rect(9px, 9999px, 19px, 0);
  }
  45% {
    clip: rect(20px, 9999px, 36px, 0);
  }
  50% {
    clip: rect(15px, 9999px, 24px, 0);
  }
  55% {
    clip: rect(79px, 9999px, 81px, 0);
  }
  60.00000000000001% {
    clip: rect(84px, 9999px, 20px, 0);
  }
  65% {
    clip: rect(26px, 9999px, 4px, 0);
  }
  70.00000000000001% {
    clip: rect(51px, 9999px, 90px, 0);
  }
  75% {
    clip: rect(63px, 9999px, 77px, 0);
  }
  80% {
    clip: rect(97px, 9999px, 9px, 0);
  }
  85% {
    clip: rect(95px, 9999px, 3px, 0);
  }
  90% {
    clip: rect(97px, 9999px, 46px, 0);
  }
  95% {
    clip: rect(55px, 9999px, 34px, 0);
  }
  100% {
    clip: rect(64px, 9999px, 59px, 0);
  }
}

@keyframes c1 {
  0% {
    clip: rect(2px, 9999px, 35.5px, 0);
  }
  5% {
    clip: rect(77px, 9999px, 35.5px, 0);
  }
  10% {
    clip: rect(8px, 9999px, 47px, 0);
  }
  15.000000000000002% {
    clip: rect(45px, 9999px, 17px, 0);
  }
  20% {
    clip: rect(67px, 9999px, 13px, 0);
  }
  25% {
    clip: rect(65px, 9999px, 38px, 0);
  }
  30.000000000000004% {
    clip: rect(13px, 9999px, 48px, 0);
  }
  35.00000000000001% {
    clip: rect(16px, 9999px, 4px, 0);
  }
  40% {
    clip: rect(17px, 9999px, 39px, 0);
  }
  45% {
    clip: rect(40px, 9999px, 35.5px, 0);
  }
  50% {
    clip: rect(60px, 9999px, 48px, 0);
  }
  55% {
    clip: rect(79px, 9999px, 81px, 0);
  }
  60.00000000000001% {
    clip: rect(84px, 9999px, 20px, 0);
  }
  65% {
    clip: rect(26px, 9999px, 4px, 0);
  }
  70.00000000000001% {
    clip: rect(51px, 9999px, 90px, 0);
  }
  75% {
    clip: rect(63px, 9999px, 77px, 0);
  }
  80% {
    clip: rect(97px, 9999px, 9px, 0);
  }
  85% {
    clip: rect(95px, 9999px, 3px, 0);
  }
  90% {
    clip: rect(97px, 9999px, 46px, 0);
  }
  95% {
    clip: rect(55px, 9999px, 34px, 0);
  }
  100% {
    clip: rect(64px, 9999px, 59px, 0);
  }
}

@-webkit-keyframes c2 {
  0% {
    clip: rect(11px, 9999px, 28px, 0);
  }
  5% {
    clip: rect(52px, 9999px, 37px, 0);
  }
  10% {
    clip: rect(24px, 9999px, 27px, 0);
  }
  15.000000000000002% {
    clip: rect(82px, 9999px, 25px, 0);
  }
  20% {
    clip: rect(46px, 9999px, 42px, 0);
  }
  25% {
    clip: rect(45px, 9999px, 42px, 0);
  }
  30.000000000000004% {
    clip: rect(57px, 9999px, 87px, 0);
  }
  35.00000000000001% {
    clip: rect(29px, 9999px, 83px, 0);
  }
  40% {
    clip: rect(5px, 9999px, 61px, 0);
  }
  45% {
    clip: rect(12px, 9999px, 85px, 0);
  }
  50% {
    clip: rect(6px, 9999px, 57px, 0);
  }
  55% {
    clip: rect(63px, 9999px, 10px, 0);
  }
  60.00000000000001% {
    clip: rect(19px, 9999px, 63px, 0);
  }
  65% {
    clip: rect(9px, 9999px, 92px, 0);
  }
  70.00000000000001% {
    clip: rect(7px, 9999px, 26px, 0);
  }
  75% {
    clip: rect(82px, 9999px, 91px, 0);
  }
  80% {
    clip: rect(86px, 9999px, 85px, 0);
  }
  85% {
    clip: rect(3px, 9999px, 21px, 0);
  }
  90% {
    clip: rect(22px, 9999px, 14px, 0);
  }
  95% {
    clip: rect(98px, 9999px, 99px, 0);
  }
  100% {
    clip: rect(44px, 9999px, 18px, 0);
  }
  23% {
    transform: scaleX(0.8);
  }
}

@keyframes c2 {
  0% {
    clip: rect(11px, 9999px, 28px, 0);
  }
  5% {
    clip: rect(52px, 9999px, 37px, 0);
  }
  10% {
    clip: rect(24px, 9999px, 27px, 0);
  }
  15.000000000000002% {
    clip: rect(82px, 9999px, 25px, 0);
  }
  20% {
    clip: rect(46px, 9999px, 42px, 0);
  }
  25% {
    clip: rect(45px, 9999px, 42px, 0);
  }
  30.000000000000004% {
    clip: rect(57px, 9999px, 87px, 0);
  }
  35.00000000000001% {
    clip: rect(29px, 9999px, 83px, 0);
  }
  40% {
    clip: rect(5px, 9999px, 61px, 0);
  }
  45% {
    clip: rect(12px, 9999px, 85px, 0);
  }
  50% {
    clip: rect(6px, 9999px, 57px, 0);
  }
  55% {
    clip: rect(63px, 9999px, 10px, 0);
  }
  60.00000000000001% {
    clip: rect(19px, 9999px, 63px, 0);
  }
  65% {
    clip: rect(9px, 9999px, 92px, 0);
  }
  70.00000000000001% {
    clip: rect(7px, 9999px, 26px, 0);
  }
  75% {
    clip: rect(82px, 9999px, 91px, 0);
  }
  80% {
    clip: rect(86px, 9999px, 85px, 0);
  }
  85% {
    clip: rect(3px, 9999px, 21px, 0);
  }
  90% {
    clip: rect(22px, 9999px, 14px, 0);
  }
  95% {
    clip: rect(98px, 9999px, 99px, 0);
  }
  100% {
    clip: rect(44px, 9999px, 18px, 0);
  }
  23% {
    transform: scaleX(0.8);
  }
}

@-webkit-keyframes clock-bag {
  0% {
    transform: translate(1px, 4px);
  }
  2% {
    transform: translate(3px, 5px);
  }
  4% {
    transform: translate(1px, 4px);
  }
  6% {
    transform: translate(5px, 5px);
  }
  8% {
    transform: translate(4px, 5px);
  }
  10% {
    transform: translate(1px, 1px);
  }
  12% {
    transform: translate(4px, 4px);
  }
  14.000000000000002% {
    transform: translate(1px, 2px);
  }
  16% {
    transform: translate(1px, 2px);
  }
  18% {
    transform: translate(5px, 1px);
  }
  20% {
    transform: translate(2px, 4px);
  }
  22% {
    transform: translate(1px, 2px);
  }
  24% {
    transform: translate(1px, 5px);
  }
  26% {
    transform: translate(3px, 2px);
  }
  28.000000000000004% {
    transform: translate(1px, 3px);
  }
  30% {
    transform: translate(1px, 2px);
  }
  32% {
    transform: translate(4px, 4px);
  }
  34% {
    transform: translate(2px, 5px);
  }
  36% {
    transform: translate(1px, 2px);
  }
  38% {
    transform: translate(4px, 4px);
  }
  40% {
    transform: translate(3px, 5px);
  }
  42% {
    transform: translate(5px, 5px);
  }
  44% {
    transform: translate(5px, 5px);
  }
  46.00000000000001% {
    transform: translate(5px, 2px);
  }
  48% {
    transform: translate(4px, 1px);
  }
  50% {
    transform: translate(1px, 5px);
  }
  52% {
    transform: translate(1px, 2px);
  }
  54% {
    transform: translate(2px, 3px);
  }
  56.00000000000001% {
    transform: translate(1px, 1px);
  }
  58% {
    transform: translate(5px, 5px);
  }
  60% {
    transform: translate(1px, 1px);
  }
  62% {
    transform: translate(2px, 2px);
  }
  64% {
    transform: translate(3px, 3px);
  }
  66% {
    transform: translate(4px, 3px);
  }
  68% {
    transform: translate(3px, 3px);
  }
  70.00000000000001% {
    transform: translate(5px, 4px);
  }
  72% {
    transform: translate(5px, 1px);
  }
  74% {
    transform: translate(3px, 5px);
  }
  76% {
    transform: translate(3px, 4px);
  }
  78% {
    transform: translate(4px, 3px);
  }
  80% {
    transform: translate(2px, 2px);
  }
  82.00000000000001% {
    transform: translate(1px, 2px);
  }
  84% {
    transform: translate(1px, 2px);
  }
  86% {
    transform: translate(2px, 2px);
  }
  88% {
    transform: translate(4px, 3px);
  }
  90% {
    transform: translate(3px, 4px);
  }
  92.00000000000001% {
    transform: translate(5px, 1px);
  }
  47% {
    transform: translate(4px, 1px);
  }
  96% {
    transform: translate(4px, 1px);
  }
  98% {
    transform: translate(5px, 4px);
  }
  100% {
    transform: translate(5px, 1px);
  }
  1% {
    transform: scaleY(1) skewX(0deg);
  }
  1.5% {
    transform: scaleY(3) skewX(-60deg);
  }
  2% {
    transform: scaleY(1) skewX(0deg);
  }
  51% {
    transform: scaleX(1) scaleY(1) skewX(0deg);
  }
  52% {
    transform: scaleX(1.5) scaleY(0.2) skewX(80deg);
  }
  53% {
    transform: scaleX(1) scaleY(1) skewX(0deg);
  }
}

@keyframes clock-bag {
  0% {
    transform: translate(1px, 4px);
  }
  2% {
    transform: translate(3px, 5px);
  }
  4% {
    transform: translate(1px, 4px);
  }
  6% {
    transform: translate(5px, 5px);
  }
  8% {
    transform: translate(4px, 5px);
  }
  10% {
    transform: translate(1px, 1px);
  }
  12% {
    transform: translate(4px, 4px);
  }
  14.000000000000002% {
    transform: translate(1px, 2px);
  }
  16% {
    transform: translate(1px, 2px);
  }
  18% {
    transform: translate(5px, 1px);
  }
  20% {
    transform: translate(2px, 4px);
  }
  22% {
    transform: translate(1px, 2px);
  }
  24% {
    transform: translate(1px, 5px);
  }
  26% {
    transform: translate(3px, 2px);
  }
  28.000000000000004% {
    transform: translate(1px, 3px);
  }
  30% {
    transform: translate(1px, 2px);
  }
  32% {
    transform: translate(4px, 4px);
  }
  34% {
    transform: translate(2px, 5px);
  }
  36% {
    transform: translate(1px, 2px);
  }
  38% {
    transform: translate(4px, 4px);
  }
  40% {
    transform: translate(3px, 5px);
  }
  42% {
    transform: translate(5px, 5px);
  }
  44% {
    transform: translate(5px, 5px);
  }
  46.00000000000001% {
    transform: translate(5px, 2px);
  }
  48% {
    transform: translate(4px, 1px);
  }
  50% {
    transform: translate(1px, 5px);
  }
  52% {
    transform: translate(1px, 2px);
  }
  54% {
    transform: translate(2px, 3px);
  }
  56.00000000000001% {
    transform: translate(1px, 1px);
  }
  58% {
    transform: translate(5px, 5px);
  }
  60% {
    transform: translate(1px, 1px);
  }
  62% {
    transform: translate(2px, 2px);
  }
  64% {
    transform: translate(3px, 3px);
  }
  66% {
    transform: translate(4px, 3px);
  }
  68% {
    transform: translate(3px, 3px);
  }
  70.00000000000001% {
    transform: translate(5px, 4px);
  }
  72% {
    transform: translate(5px, 1px);
  }
  74% {
    transform: translate(3px, 5px);
  }
  76% {
    transform: translate(3px, 4px);
  }
  78% {
    transform: translate(4px, 3px);
  }
  80% {
    transform: translate(2px, 2px);
  }
  82.00000000000001% {
    transform: translate(1px, 2px);
  }
  84% {
    transform: translate(1px, 2px);
  }
  86% {
    transform: translate(2px, 2px);
  }
  88% {
    transform: translate(4px, 3px);
  }
  90% {
    transform: translate(3px, 4px);
  }
  92.00000000000001% {
    transform: translate(5px, 1px);
  }
  47% {
    transform: translate(4px, 1px);
  }
  96% {
    transform: translate(4px, 1px);
  }
  98% {
    transform: translate(5px, 4px);
  }
  100% {
    transform: translate(5px, 1px);
  }
  1% {
    transform: scaleY(1) skewX(0deg);
  }
  1.5% {
    transform: scaleY(3) skewX(-60deg);
  }
  2% {
    transform: scaleY(1) skewX(0deg);
  }
  51% {
    transform: scaleX(1) scaleY(1) skewX(0deg);
  }
  52% {
    transform: scaleX(1.5) scaleY(0.2) skewX(80deg);
  }
  53% {
    transform: scaleX(1) scaleY(1) skewX(0deg);
  }
}

@-webkit-keyframes tr-bag {
  0% {
    transform: translate(2px, 3px);
  }
  2% {
    transform: translate(5px, 5px);
  }
  4% {
    transform: translate(4px, 3px);
  }
  6% {
    transform: translate(3px, 3px);
  }
  8% {
    transform: translate(1px, 4px);
  }
  10% {
    transform: translate(3px, 4px);
  }
  12% {
    transform: translate(5px, 5px);
  }
  14.000000000000002% {
    transform: translate(4px, 3px);
  }
  16% {
    transform: translate(1px, 3px);
  }
  18% {
    transform: translate(1px, 3px);
  }
  20% {
    transform: translate(4px, 2px);
  }
  22% {
    transform: translate(4px, 3px);
  }
  24% {
    transform: translate(2px, 5px);
  }
  26% {
    transform: translate(3px, 1px);
  }
  28.000000000000004% {
    transform: translate(1px, 3px);
  }
  30% {
    transform: translate(3px, 4px);
  }
  32% {
    transform: translate(3px, 3px);
  }
  34% {
    transform: translate(2px, 2px);
  }
  36% {
    transform: translate(2px, 1px);
  }
  38% {
    transform: translate(5px, 2px);
  }
  40% {
    transform: translate(5px, 1px);
  }
  42% {
    transform: translate(5px, 4px);
  }
  44% {
    transform: translate(5px, 5px);
  }
  46.00000000000001% {
    transform: translate(2px, 4px);
  }
  48% {
    transform: translate(5px, 1px);
  }
  50% {
    transform: translate(1px, 5px);
  }
  52% {
    transform: translate(3px, 4px);
  }
  54% {
    transform: translate(4px, 2px);
  }
  56.00000000000001% {
    transform: translate(3px, 4px);
  }
  58% {
    transform: translate(1px, 5px);
  }
  60% {
    transform: translate(5px, 5px);
  }
  62% {
    transform: translate(3px, 3px);
  }
  64% {
    transform: translate(5px, 3px);
  }
  66% {
    transform: translate(2px, 2px);
  }
  68% {
    transform: translate(2px, 5px);
  }
  70.00000000000001% {
    transform: translate(3px, 4px);
  }
  72% {
    transform: translate(4px, 3px);
  }
  74% {
    transform: translate(5px, 1px);
  }
  76% {
    transform: translate(1px, 5px);
  }
  78% {
    transform: translate(1px, 4px);
  }
  80% {
    transform: translate(4px, 3px);
  }
  82.00000000000001% {
    transform: translate(4px, 2px);
  }
  84% {
    transform: translate(1px, 1px);
  }
  86% {
    transform: translate(3px, 2px);
  }
  88% {
    transform: translate(5px, 5px);
  }
  90% {
    transform: translate(1px, 5px);
  }
  92.00000000000001% {
    transform: translate(1px, 1px);
  }
  47% {
    transform: translate(2px, 5px);
  }
  96% {
    transform: translate(2px, 5px);
  }
  98% {
    transform: translate(1px, 2px);
  }
  100% {
    transform: translate(1px, 2px);
  }
  1% {
    transform: scaleY(1) skewX(0deg);
  }
  1.5% {
    transform: scaleY(3) skewX(-60deg);
  }
  2% {
    transform: scaleY(1) skewX(0deg);
  }
  51% {
    transform: scaleX(1) scaleY(1) skewX(0deg);
  }
  52% {
    transform: scaleX(1.5) scaleY(0.2) skewX(80deg);
  }
  53% {
    transform: scaleX(1) scaleY(1) skewX(0deg);
  }
}

@keyframes tr-bag {
  0% {
    transform: translate(2px, 3px);
  }
  2% {
    transform: translate(5px, 5px);
  }
  4% {
    transform: translate(4px, 3px);
  }
  6% {
    transform: translate(3px, 3px);
  }
  8% {
    transform: translate(1px, 4px);
  }
  10% {
    transform: translate(3px, 4px);
  }
  12% {
    transform: translate(5px, 5px);
  }
  14.000000000000002% {
    transform: translate(4px, 3px);
  }
  16% {
    transform: translate(1px, 3px);
  }
  18% {
    transform: translate(1px, 3px);
  }
  20% {
    transform: translate(4px, 2px);
  }
  22% {
    transform: translate(4px, 3px);
  }
  24% {
    transform: translate(2px, 5px);
  }
  26% {
    transform: translate(3px, 1px);
  }
  28.000000000000004% {
    transform: translate(1px, 3px);
  }
  30% {
    transform: translate(3px, 4px);
  }
  32% {
    transform: translate(3px, 3px);
  }
  34% {
    transform: translate(2px, 2px);
  }
  36% {
    transform: translate(2px, 1px);
  }
  38% {
    transform: translate(5px, 2px);
  }
  40% {
    transform: translate(5px, 1px);
  }
  42% {
    transform: translate(5px, 4px);
  }
  44% {
    transform: translate(5px, 5px);
  }
  46.00000000000001% {
    transform: translate(2px, 4px);
  }
  48% {
    transform: translate(5px, 1px);
  }
  50% {
    transform: translate(1px, 5px);
  }
  52% {
    transform: translate(3px, 4px);
  }
  54% {
    transform: translate(4px, 2px);
  }
  56.00000000000001% {
    transform: translate(3px, 4px);
  }
  58% {
    transform: translate(1px, 5px);
  }
  60% {
    transform: translate(5px, 5px);
  }
  62% {
    transform: translate(3px, 3px);
  }
  64% {
    transform: translate(5px, 3px);
  }
  66% {
    transform: translate(2px, 2px);
  }
  68% {
    transform: translate(2px, 5px);
  }
  70.00000000000001% {
    transform: translate(3px, 4px);
  }
  72% {
    transform: translate(4px, 3px);
  }
  74% {
    transform: translate(5px, 1px);
  }
  76% {
    transform: translate(1px, 5px);
  }
  78% {
    transform: translate(1px, 4px);
  }
  80% {
    transform: translate(4px, 3px);
  }
  82.00000000000001% {
    transform: translate(4px, 2px);
  }
  84% {
    transform: translate(1px, 1px);
  }
  86% {
    transform: translate(3px, 2px);
  }
  88% {
    transform: translate(5px, 5px);
  }
  90% {
    transform: translate(1px, 5px);
  }
  92.00000000000001% {
    transform: translate(1px, 1px);
  }
  47% {
    transform: translate(2px, 5px);
  }
  96% {
    transform: translate(2px, 5px);
  }
  98% {
    transform: translate(1px, 2px);
  }
  100% {
    transform: translate(1px, 2px);
  }
  1% {
    transform: scaleY(1) skewX(0deg);
  }
  1.5% {
    transform: scaleY(3) skewX(-60deg);
  }
  2% {
    transform: scaleY(1) skewX(0deg);
  }
  51% {
    transform: scaleX(1) scaleY(1) skewX(0deg);
  }
  52% {
    transform: scaleX(1.5) scaleY(0.2) skewX(80deg);
  }
  53% {
    transform: scaleX(1) scaleY(1) skewX(0deg);
  }
}

@-webkit-keyframes bg-move {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 0 -32px;
  }
}

@keyframes bg-move {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 0 -32px;
  }
}


</style>
