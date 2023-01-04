<template>
  <div class="zhihu-box">
    <div class="zhihu__top-box">
      <div class="zhihu__logo"/>
      <div class="zhihu__top-nav">
        <span class="hot_text zhihu__nav-item" :class="{active: activeNav == 'hot'}"
              @click="handleChangeNav('hot')">热榜</span>
        <span class="news_text zhihu__nav-item" :class="{active: activeNav == 'news'}" @click="handleChangeNav('news')">日报</span>
      </div>
      <div class="zhihu_liukanshan"/>
    </div>
    <el-scrollbar :height="widgetParams.heightPx - 64" :wrap-style="{backgroundColor:'white',borderRadius:'12px'}">
      <div class="zhihu__content">

        <div class="zhihu__content-item" v-for="(item, index) in viewList" :key="index">
          <div class="zhihu__desc" @click="openLink(item.url)">
            <div class="zhihu__serial-num" :level="index + 1">{{ index + 1 }}</div>
            <div class="zhihu__title">{{ item.title }}</div>
          </div>
          <div class="zhihu__hot" @click="openLink(item.url)" v-if="item.hot">
            <span class="mgc_fire_fill"/>
            <span class="zhihu__hot-count">{{ item.hot }}</span>
          </div>
        </div>
      </div>
    </el-scrollbar>

  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import {nextTick, onMounted, Ref, ref} from "vue";
import {ZhihuConvert, ZhihuModel} from "./model/ZhihuModel";
import dayjs from "dayjs";
import {ElScrollbar} from "element-plus";
import {slice} from "lodash";
import {BrowserWindowApi, WidgetParams} from "@widget-js/core";

type NavType = 'hot' | 'news';
const widgetParams = WidgetParams.fromCurrentLocation();

const props = defineProps({
  backgroundColor: {
    type: String,
  },
});

const activeNav: Ref<NavType> = ref('hot');

const hotList: Ref<ZhihuModel[]> = ref([]);
const newsList: Ref<ZhihuModel[]> = ref([]);
const viewList: Ref<ZhihuModel[]> = ref([]);

onMounted(async () => {
  await nextTick();
  await getHotList();

  await getNews();
  const yesterday = dayjs().subtract(1, 'day').format('YYYYMMDD');
  getBeforeNews(yesterday);
  handleChangeNav(activeNav.value);
});

function openLink(url: string) {
  BrowserWindowApi.openUrl(url.replaceAll("api.", "").replaceAll("questions", "question"))
}

// 知乎热榜
async function getHotList() {
  const res = await service.get("/api/v3/feed/topstory/hot-lists/total?limit=30&desktop=true");
  const result = ZhihuConvert.hot2Model(res.data.data);
  hotList.value = result;
}

// 知乎日报
async function getNews() {
  const res = await newsService.get("/api/4/stories/latest");
  const result = ZhihuConvert.news2Model(res.data.top_stories);
  console.log(result)
  newsList.value = result;
}

// 知乎日报-往日
async function getBeforeNews(dateStr: string) {
  const res = await newsService.get("/api/4/stories/before/" + dateStr);
  const result = ZhihuConvert.news2Model(res.data.stories)
  newsList.value = newsList.value.concat(result);
}

function handleChangeNav(nav: NavType) {
  activeNav.value = nav;
  if (nav == 'hot') {
    viewList.value = slice(Object.assign([], hotList.value), 0, 10);
  }
  if (nav == 'news') {
    viewList.value = slice(Object.assign([], newsList.value), 0, 10);
  }
}

const service = axios.create({
  baseURL: "https://www.zhihu.com/",
  withCredentials: true,
  timeout: 50000,
});

const newsService = axios.create({
  baseURL: "https://news-at.zhihu.com/",
  withCredentials: true,
  timeout: 50000,
});
</script>

<style scoped lang="scss">
.zhihu-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: OPPOSans-Bold, "Microsoft Yahei", serif;
  background-image: linear-gradient(46deg, rgba(5, 109, 232, 1) 0, rgba(0, 168, 255, 1) 100%);
  border-radius: 22px;
  padding: 16px;

  // 顶部
  .zhihu__top-box {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-bottom: 14px;

    .zhihu__logo {
      width: 35px;
      height: 16px;
      background-image: url("~@/widgets/zhihu/images/logo.svg");
      background-size: cover;
      position: relative;
      margin-right: 8px;
      &::after {
        position: absolute;
        content: "";
        width: 2px;
        height: 2px;
        background-color: #fff;
        border-radius: 2px;
        overflow: hidden;
        right: -8px;
        bottom: 8px;
      }
    }

    .zhihu__top-nav {
      color: #fff;
      font-size: 14px;

      .zhihu__nav-item {
        margin-left: 12px;
        cursor: pointer;
      }

      .active {
        border-radius: 1px;
        width: 28px;
        height: 2px;
        border-bottom: 2px solid rgba(255, 244, 183, 1);
      }
    }

    .zhihu_liukanshan {
      position: absolute;
      bottom: -2px;
      right: 20px;
      width: 36px;
      height: 36px;
      background-image: url("~@/widgets/zhihu/images/liukanshan.png");
      background-size: cover;
    }
  }

  .el-scrollbar__wrap .el-scrollbar__wrap--hidden-default {
    background-color: #fff;
    border-radius: 16px;
  }

  // 内容
  .zhihu__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    padding: 8px;

    .zhihu__content-item {
      display: flex;
      font-size: 14px;
      height: 18px;
      line-height: 18px;
      margin-bottom: 16px;
      width: 100%;
      justify-content: space-between;

      .zhihu__desc {
        display: flex;
        flex: 1;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;

        .zhihu__serial-num {
          background-color: #D2D2D2FF;
          border-radius: 6px;
          width: 18px;
          height: inherit;
          text-align: center;
          line-height: inherit;

          &[level='1'] {
            background-color: #FFE082FF;
          }

          &[level='2'] {
            background-color: #C5CAE9FF;
          }

          &[level='3'] {
            background-color: #CEB1A1FF;
          }
        }

        .zhihu__title {
          font-weight: 500;
          margin-left: 8px;
          height: inherit;
          line-height: inherit;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          cursor: pointer;
          text-align: left;
          flex: 1;
        }
      }

      .zhihu__hot {
        &-count {
          width: 4em;
          display: inline-block;
        }

        .mgc_fire_fill {
          &::before {
            color: #ff6252;
          }
        }
      }
    }
  }
}
</style>
