<template>
  <widget-edit-dialog :widget-params="widgetParams" :option="widgetConfigOption"
                      :widget-data="widgetData"
                      @confirm="onSaveClick()">
    <template #widget>
      <div class="text">
        <template v-if="pageContent.length > 0">
          <p
              v-for="(item, index) in pageContent"
              :key="index"
              :class="{ on: 1 === index }"
          >
            {{ item }}
          </p>
        </template>
      </div>
    </template>
    <template v-slot:form>
      <el-form>
        <el-form-item label="小说文件">
          <el-button @click="pickFile" id="btn-pick-file" type="primary"><span class="icon mgc_document_2_line"></span>
            选取文件
          </el-button>
          <span>{{ filename }}</span>
        </el-form-item>
        <el-form-item label="当前页数">
          <el-input :style="{width:'100px',marginRight:`200px`}" @change="pageChange" v-model="currentPage"
                    type="number" min="1"
                    max="10000000">
            <template #prepend>第</template>
            <template #append>/{{ pageController.getTotalPage() }}页</template>
          </el-input>
          <el-button @click="previousPage">上一页</el-button>
          <el-button @click="nextPage">下一页</el-button>
        </el-form-item>
        <el-form-item label="页数跳转">
          <el-input v-model="keyword" placeholder="根据关键词，跳转到对应页数">
            <template #append>
              <el-button type="primary" @click="search">
                搜索
              </el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
    </template>
  </widget-edit-dialog>
</template>

<script lang="ts">

import LyricBookWidget from "./LyricBookWidget.vue";
import {useWidget, WidgetConfigOption, WidgetEditDialog} from "@widget-js/vue3";
import {DialogApi, NotificationApi, WidgetDataRepository} from "@widget-js/core";
import {reactive, ref} from "vue";
import LyricBookData, {readFile} from "@/widgets/lyric-book/model/LyricBookData";
import PageController from "@/widgets/lyric-book/model/PageController";

export default {
  name: "",
  components: {LyricBookWidget, WidgetEditDialog},
  setup() {
    const filePath = ref("");
    const currentPage = ref(1);
    const pageController = reactive(new PageController(""));

    const {widgetData, widgetParams, sizeStyle} = useWidget(LyricBookData, {
      loadDataByWidgetName: true,
      onDataLoaded: (data) => {
        if (data) {
          pageController.setCurrentPage(data.currentPage);
          filePath.value = data.file ?? "";
          currentPage.value = data.currentPage;
        }
      }
    });


    //修改成需要设置组件参数配置
    const widgetConfigOption = reactive(new WidgetConfigOption({
      custom: true,
      backgroundColor: false,
      borderRadius: false,
      previewWidth: 500,
      previewHeight: 400
    }));

    widgetParams.widthPx = 500;
    widgetParams.heightPx = 400;
    const keyword = ref("");
    const txt = ref("");
    const pageContent = ref<string[]>([]);
    const totalPage = ref(0);
    return {
      widgetData,
      txt,
      pageController,
      pageContent,
      totalPage,
      keyword,
      currentPage,
      widgetParams,
      widgetConfigOption,
      filePath
    };
  },
  computed: {
    filename() {
      const strings = this.filePath.split("\\");
      if (strings.length < 2) {
        return strings[0];
      }
      return strings[strings.length - 1];
    }
  },
  watch: {
    filePath(newValue) {
      if (newValue) {
        this.pageContent = this.pageController.updateBookText(readFile(newValue));
      }
    },
    currentPage() {
      // this.pageContent = this.pageController.setCurrentLine(this.currentPage);
    }
  },
  methods: {
    pageChange() {
      this.pageContent = this.pageController.setCurrentPage(this.currentPage - 1);
    },
    previousPage() {
      this.pageContent = this.pageController.previousPage();
      this.currentPage = this.pageController.getCurrentPage() + 1;
    },
    nextPage() {
      this.pageContent = this.pageController.nextPage();
      this.currentPage = this.pageController.getCurrentPage() + 1;
    },
    search() {
      const result = this.pageController.search(this.keyword);
      if (result && result[0] > -1) {
        this.pageContent = this.pageController.setCurrentPage(result[0]);
        this.currentPage = this.pageController.getCurrentPage() + 1;
      } else {
        NotificationApi.error("没有找到关键词")
      }
    },
    async onSaveClick() {
      this.widgetData.currentPage = parseInt(this.currentPage.toString());
      this.widgetData.file = this.filePath;
      await WidgetDataRepository.saveByName(this.widgetData);
      window.close();
    },
    async pickFile() {
      const file = await DialogApi.pickFile(["txt"]);
      if (file) {
        this.filePath = file;
      }
    },
  }
}
</script>

<style lang="scss" scoped>
#btn-pick-file {
}

.text {
  max-width: 500px;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  align-items: center;
  text-align: center;
}

.icon {
  &:before {
    color: white;
  }
}
</style>
