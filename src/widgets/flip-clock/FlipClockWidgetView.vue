<template>
  <widget-wrapper>
    <div class="clock">
      <div class="flipper" ref="hourRef">
        <div class="gear"></div>
        <div class="gear"></div>
        <div class="top">
          <div class="text">00</div>
        </div>
        <div class="bottom">
          <div class="text">00</div>
        </div>
      </div>
      <div class="flipper" ref="minuteRef">
        <div class="gear"></div>
        <div class="gear"></div>
        <div class="top">
          <div class="text">00</div>
        </div>
        <div class="bottom">
          <div class="text">00</div>
        </div>
      </div>
      <div class="flipper" ref="secondRef">
        <div class="gear"></div>
        <div class="gear"></div>
        <div class="top">
          <div class="text">00</div>
        </div>
        <div class="bottom">
          <div class="text">00</div>
        </div>
      </div>
    </div>
  </widget-wrapper>
</template>

<script lang="ts" setup>
import {WidgetData} from '@widget-js/core';
import {useWidget, WidgetWrapper} from '@widget-js/vue3'
import {nextTick, onMounted, ref} from "vue";

const {widgetData, widgetParams} = useWidget(WidgetData);

var myhour, myminute, mysecond;
const hourRef = ref<HTMLElement>()
const minuteRef = ref<HTMLElement>()
const secondRef = ref<HTMLElement>()

function flipNumber(el: HTMLElement, newNumber: string) {
  var newTop = el.querySelector(".top")!.cloneNode(true) as HTMLElement;
  var newBottom = el.querySelector(".bottom")!.cloneNode(true) as HTMLElement;
  newTop.classList.add("new");
  newBottom.classList.add("new");
  newBottom.querySelector(".text")!.textContent = newNumber;
  el.querySelector(".top")!.after(newTop);
  el.querySelector(".top.new")!.append(newBottom);
  el.classList.add("flipping");
  el.querySelector(".top:not(.new)")!.querySelector(".text")!.textContent = newNumber;
  setTimeout(function () {
    el.querySelector(".bottom:not(.new)")!.querySelector(".text")!.textContent = newNumber;
  }, 500);
}

function setTime() {
  for (let elements of document.querySelectorAll('.flipper')) {
    elements.classList.remove("flipping")
  }
  for (let elements of document.querySelectorAll('.flipper .new')) {
    elements.remove();
  }
  const now = new Date();
  let seconds = now.getSeconds().toString();
  if (seconds.length == 1) {
    seconds = "0" + seconds;
  }
  let minutes = now.getMinutes().toString();
  if (minutes.length == 1) {
    minutes = "0" + minutes;
  }
  let hour: string | number = now.getHours();
  if (hour > 12) {
    hour = hour - 12;
  }
  if (hour == 0) {
    hour = 12;
  }
  hour = hour.toString();
  if (hour.length == 1) {
    hour = "0" + hour;
  }

  if (hourRef.value!.querySelector('.top.text')!.textContent !== hour) {
    flipNumber(hourRef.value!, hour);
  }
  if (minuteRef.value!.querySelector('.top.text')!.textContent !== minutes) {
    flipNumber(minuteRef.value!, hour);
  }

  if (secondRef.value!.querySelector('.top.text')!.textContent !== seconds) {
    flipNumber(secondRef.value!, hour);
  }
  setTimeout(function () {
    setTime();
  }, 500);
}

onMounted(async () => {
  await nextTick();
  setTime();
})
</script>

<style scoped>
/*
font-family: 'Barlow', sans-serif;
font-family: 'Barlow Condensed', sans-serif;
font-family: 'Saira Extra Condensed', sans-serif;
*/
:root {
  --bgcolor: rgb(38, 37, 41);
  --clockheight: 220px;
  --radius: 30px;
  --rotationtime: 0.55s;
  --avobg: rgb(227, 246, 104);
}

html {
  box-sizing: border-box;
}

html *,
html *::before,
html *::after {
  box-sizing: inherit;
  padding: 0;
  margin: 0;
}

body {
  margin: 0;
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: var(--bgcolor);
  color: #fff;
  font-family: "Saira Extra Condensed", sans-serif;
}

.clock {
  display: grid;
  padding: 0 12px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 12px;
  min-width: 200px;
  height: var(--clockheight);
  /*   background: rgb(26, 25, 28); */
  border-radius: var(--radius);
  /*   background-repeat: no-repeat; */
  background-image: linear-gradient(
    rgb(14, 14, 15) 0%,
    rgb(26, 25, 28) 20%,
    rgb(44, 44, 52) 50%,
    rgb(20, 20, 27) 100%
  );
  /*   border-top: 6px solid rgb(56, 56, 61); */
  /*   border-bottom: 6px solid rgb(59, 59, 65); */
  box-shadow: inset 0 -3px 6px 3px rgba(0, 0, 0, 0.2),
  inset 0 4px 8px 3px rgba(0, 0, 0, 0.4),
  0 2px 3px 1px rgba(255, 255, 255, 0.3), 0 -2px 4px 4px rgba(56, 56, 61, 0.5);
}

.flipper {
  /*   border: 1px solid #c00; */
  position: relative;
  width: 100%;
  min-width: 150px;
  height: 100%;
  transform-style: preserve-3d;
  perspective: 1600px;
}

.gear {
  position: absolute;
  top: calc(var(--clockheight) / 3);
  width: 12px;
  height: calc(var(--clockheight) / 3);
  background: linear-gradient(
    to bottom,
    #000000 0%,
    #666666 17%,
    #7f7f7f 52%,
    #7f7f7f 52%,
    #0c0c0c 53%,
    #595959 87%,
    #131313 100%
  );
  outline: 3px solid #000;
  z-index: 99;
  transform-style: preserve-3d;
  transform: translateZ(10px);
  perspective: 0;
}

.gear:nth-child(2) {
  left: calc(100% - 12px);
}

.top,
.bottom {
  box-shadow: 0 6px 6px 1px rgba(0, 0, 0, 0.5),
  0 2px 2px 1px rgba(255, 255, 255, 0.15);
  border-top: 2px solid rgb(102, 103, 110);
  border-bottom: 2px solid #000;
  /*   transition: all 1s ease-in-out; */
}

.top {
  /*   border: 1px solid #c00; */
  position: relative;
  width: 100%;
  height: calc(50% - 15px);
  background-image: linear-gradient(rgb(48, 49, 53) 0%, rgb(56, 57, 62) 100%);
  margin-top: 10px;
  margin-bottom: 5px;
  border-top-left-radius: calc(var(--radius) * 0.65);
  border-top-right-radius: calc(var(--radius) * 0.65);
}

.bottom {
  position: relative;
  /*   border: 1px solid green; */
  width: 100%;
  height: calc(50% - 15px);
  background-image: linear-gradient(rgb(57, 58, 63) 0%, rgb(65, 65, 71) 100%);
  margin-top: 5px;
  margin-bottom: 10px;
  border-bottom-left-radius: calc(var(--radius) * 0.65);
  border-bottom-right-radius: calc(var(--radius) * 0.65);
}

.text {
  font-size: 140px;
  display: block;
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;
  line-height: 193px;
  text-align: center;
}

.bottom .text {
  line-height: 0;
}

.top.new,
.bottom.new {
  position: absolute;
  left: 0;
  z-index: 12;
  /*   background: green; */
}

.top.new {
  top: 0;
  z-index: 1;
  /*   backface-visibility: hidden; */
}

.top.new .text {
  backface-visibility: hidden;
}

/* .top.new:before {
  content: "";
  position: absolute;
  top: calc(var(--clockheight) / 3);
  left: 0;
  width: 15px;
  height: calc(var(--clockheight) / 3);
  background: #000;
}
.top.new:after {
  content: "";
  position: absolute;
  top: calc(var(--clockheight) / 3);
  right: 0;
  width: 15px;
  height: calc(var(--clockheight) / 3);
  background: #000;
} */
.bottom.new {
  /*   background: red; */
  position: absolute;
  top: 0;
  height: calc(100% - 0px);
  transform: rotateX(0.5turn);
  /*   backface-visibility: hidden; */
  z-index: 1;
  opacity: 0;
}

.flipper.flipping .top.new {
  transform-origin: bottom center;
  /*   transform: rotateX(-180deg) translateY(-10px); */
  animation: rotate var(--rotationtime) 1 ease-in-out forwards;
}

.flipper.flipping .bottom.new {
  animation: rotatebottom var(--rotationtime) 1 ease-in-out forwards;
}

@keyframes rotatebottom {
  0% {
    opacity: 0;
  }
  49% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}

@keyframes rotate {
  0% {
    transform: rotateX(0) translateY(0px);
  }
  100% {
    transform: rotateX(-180deg) translateY(-10px);
  }
}

Resources
</style>
