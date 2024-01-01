<script lang="ts">
// import {useInterval} from '@vueuse/core'
import dayjs from 'dayjs'
import type { Solar } from 'lunar-typescript'
import {
  Lunar,
  LunarMonth,
} from 'lunar-typescript'
import type { PropType } from 'vue'
import type { BirthdayPeople } from '@/widgets/birthday-list/model/BirthdayListData'
import type BirthdayListData from '@/widgets/birthday-list/model/BirthdayListData'

// import {delay} from "lodash";
// import BirthdayListData from './model/BirthdayListData';

/**
 * 按照生日到期时间排序展示
 */
export default {
  name: 'BirthdayListWidget',
  props: { birthdayListData: { type: Object as PropType<BirthdayListData> } },
  emits: ['add'],
  computed: {
    peopleList() {
      const peopleList: BirthdayPeople[] = []
      this.birthdayListData.peopleList.forEach(it => peopleList.push(it))
      const curDate = dayjs()
      for (let i = 0; i < peopleList.length; i++) {
        const people = peopleList[i]
        let newDate
        if (people.type == 'Y') {
          const solarDate = this.getSolarDate(curDate.year(), people.month, people.day)
          newDate = dayjs(solarDate.toString())
        }
        else {
          newDate = dayjs(`${curDate.year()}-${people.month > 9 ? '' : '0'}${people.month}-${people.day > 9 ? '' : '0'}${people.day}`)
        }
        const diff = newDate.diff(curDate, 'day')
        if (diff >= 0) {
          peopleList[i].qty = diff
        }
        else {
          peopleList[i].qty = newDate.add(1, 'year').diff(curDate, 'day')
        }
      }
      peopleList.sort((a, b) => {
        return a.qty - b.qty
      })
      return peopleList
    },
  },
  watch: {
    birthdayListData() {
      // this.update();
    },
  },
  // emits: ["confirm", "cancel"],
  methods: {
    getSolarDate(year: number, month: number, day: number): Solar {
      const lunarMonth = LunarMonth.fromYm(year, month)
      const lastDay = lunarMonth!.getDayCount()
      return Lunar.fromYmd(year, month, day > lastDay ? lastDay : day).getSolar()
    },
    update() {

    },
    getShowDate(item) {
      if (item.type == 'N') {
        return `${item.month}月${item.day}日`
      }

      const lunar = this.getSolarDate(dayjs().year(), item.month, item.day)
      return `${lunar.getMonth()}月${lunar.getDay()}日`
    },
  },
}
</script>

<template>
  <div
    class="birthday-list-container" :style="{
      backgroundColor: birthdayListData?.theme.backgroundColor,
    }"
  >
    <img class="image" src="./images/balloon.png">
    <div class="title">
      <span>{{ birthdayListData.title }}</span>
      <div class="add mgc_add_circle_line" @click="$emit('add')" />
    </div>
    <div class="people-list" style="flex:1; display:flex; flex-flow:column; overflow: auto;">
      <template v-for="item in peopleList" :key="item.createdAt">
        <div class="list" :class="{ active: item.qty == 0 }">
          <div class="left">
            <div class="name">
              <div class="name-value">
                {{ item.name }}
              </div>
            </div>
            <div class="dates">
              <div v-if="item.type == 'Y'" class="date">
                <div class="date-type">
                  农
                </div>
                <div class="date-value">
                  {{ item.month }}月{{ item.day }}日
                </div>
              </div>
              <div class="date">
                <div class="date-type">
                  公
                </div>
                <div class="date-value">
                  {{ getShowDate(item) }}
                </div>
              </div>
            </div>
          </div>
          <div class="right" :class="{ active: item.qty == 0 }">
            <template v-if="item.qty == 0">
              <span class="icon mgc_cake_line" />
            </template>
            <template v-else>
              <div class="qty">
                {{ item.qty }}
              </div>
              <div class="unit">
                天
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
//背景设置为透明，并隐藏滚动条
body * {
  background: transparent;
  overflow: hidden;
}

.birthday-list-container {
  padding: 24px;
  overflow: hidden;
  background-color: #FB604B;
  border-radius: 20px;
  height: 100%;
  position: relative;
  width: 100%;
  display: flex;
  flex-flow: column;
  aspect-ratio: 1/1;

  ::-webkit-scrollbar {
    height: 0;
    width: 0;
    color: transparent;
  }

  .image {
    position: absolute;
    right: 15px;
    height: 71px;
    top: 12px;
  }

  .title {
    display: flex;
    justify-content: flex-start;
    color: white;
    font-size: 20px;
    font-weight: bold;
    align-items: center;
    margin-bottom: 16px;

    .add {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      background-size: 100% 100%;
      //background-image: url(../../assets/widget/birthday_list/add.png);
      margin-left: 6px;

      &:before {
        font-size: 24px;
        color: white;
      }

      &:hover {
        cursor: pointer
      }
    }
  }

  .list + .list {
    margin-top: 12px;
  }

  .list {
    //margin-top: 12px;
    padding: 12px;
    background-color: #FAF3E3;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    z-index: 1;

    &.active {
      background: linear-gradient(90deg, #FC9F12 0%, #FAD960 100%);
      box-shadow: 1px 1px 4px 0px rgba(221, 221, 221, 0.25);
      border: 1px solid;
      border-color: #FAD960;

      .left {
        color: white;
      }

      .date {
        .date-type {
          background-color: #FFF0C5;
        }
      }
    }

    .left {
      color: #303133;
      display: flex;
      flex-flow: column;
      justify-content: space-between;

      .name {
        display: flex;
        align-items: baseline;

        .name-value {
          font-size: 16px;
          font-weight: bold;
          margin-right: 10px;
        }

        .date {
          margin-top: 0px;
        }
      }

      .dates {
        display: flex;
      }

      .date {
        display: flex;
        margin-top: 6px;
        margin-right: 6px;
        font-weight: 400;
        align-items: center;

        .date-type {
          color: #986105;
          background-color: #FAE4B1;
          font-size: 10px;
          border-radius: 4px;
          text-align: center;
          //padding: 3px;
          width: 16px;
          height: 16px;
        }

        .date-value {
          margin-left: 5px;
          font-size: 14px;
        }
      }
    }

    .right {
      background-color: #FAE4B1;
      border-radius: 5px;
      width: 50px;
      height: 50px;
      text-align: center;

      &.active {
        border-radius: 25px;
        background-color: #FF9716;
        font-size: 22px;
        display: flex;
        justify-content: center;
        align-items: center;

        .mgc_cake_line:before {
          color: white;
        }
      }

      .qty {
        color: #47310A;
        font-size: 24px;
        font-weight: 400;
        margin: 2px;
      }

      .unit {
        display: block;
        background-color: #FADC98;
        font-size: 12px;
        height: 20px;
      }
    }
  }
}
</style>
