<script lang="js">
import { useScroll } from '@vueuse/core'
import { ref } from 'vue'
import LyricBookData from '@/widgets/lyric-book/model/LyricBookData'

export default {
  name: 'Lyric',
  props: {
    // 歌词数据
    lyric: {
      type: Array,
      default: () => [],
    },
    // 是否无歌词
    nolyric: {
      type: Boolean,
      default: false,
    },
    topPadding: {
      type: Boolean,
      default: true,
    },
    // 当前歌词下标
    lyricIndex: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    const musicLyric = ref()
    const { y: scrollY } = useScroll(musicLyric, { behavior: 'smooth' })
    return {
      musicLyric,
      scrollY,
    }
  },
  data() {
    return { top: 0 }
  },
  computed: {
    LyricBookData() {
      return LyricBookData
    },
    verticalPadding() {
      return this.top * LyricBookData.lineHeight
    },
    currentScrollY() {
      return LyricBookData.lineHeight * this.lyricIndex
    },
  },
  watch: {
    lyricIndex() {
      this.scrollY = this.currentScrollY
    },
  },
  mounted() {
    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimer)
      this.resizeTimer = setTimeout(() => this.calcTop(), 60)
    })
    this.$nextTick(() => this.calcTop())
  },
  methods: {
    // 计算歌词居中的 top值
    calcTop() {
      const dom = this.$refs.musicLyric
      const { display = '' } = window.getComputedStyle(dom)
      if (display === 'none') {
        return
      }

      const height = dom.offsetHeight
      this.top = Math.floor((height - 56) / LyricBookData.lineHeight / 2)
    },
  },
}
</script>

<template>
  <div class="lyric">
    <!-- 封面 -->
    <dl class="music-info">
      <dt>
        <img src="../img/player_cover.png">
      </dt>
      <dd>爱拼才会赢</dd>
      <dd class="author">
        歌手：叶启田
      </dd>
      <dd class="album">
        专辑：《闽南情歌大对唱》
      </dd>
    </dl>
    <!-- 歌词 -->
    <div
      ref="musicLyric" class="music-lyric"
      :style="{ paddingTop: `${LyricBookData.lineHeight}px`, paddingBottom: `${verticalPadding}px` }"
    >
      <div class="music-lyric-items" :style="{ lineHeight: `${LyricBookData.lineHeight}px` }">
        <template v-if="lyric.length > 0">
          <p
            v-for="(item, index) in lyric"
            :key="index"
            :class="{ on: lyricIndex === index }"
          >
            {{ item }}
          </p>
        </template>
        <p v-else>
          歌词加载失败！
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lyric {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  padding: 0 100px;
}

p {
  margin: 0;
}

.music-info {
  padding-bottom: 20px;
  text-align: center;
  font-size: 18px;
  flex: 1;

  .author, .album {
    color: rgba(255, 255, 255, 0.6);
    font-size: 16px;
  }

  dt {
    position: relative;
    width: 186px;
    height: 186px;
    margin: 0 auto 15px;

    &:after {
      content: '';
      position: absolute;
      left: 9px;
      top: 0;
      width: 201px;
      height: 180px;
      background: url('../img/album_cover_player.png') 0 0 no-repeat;
    }

    img {
      vertical-align: middle;
      width: 186px;
      height: 186px;
    }
  }

  dd {
    margin: 12px 0;
    color: white;
    height: 30px;
    line-height: 30px;
  }
}

/*歌词部分*/
.music-lyric {
  height: 90%;
  left: 0;
  flex: 1;
  overflow: hidden;
  text-align: center;
  mask-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.6) 5%,
      rgba(255, 255, 255, 1) 25%,
      rgba(255, 255, 255, 1) 75%,
      rgba(255, 255, 255, 0.2) 95%,
      rgba(255, 255, 255, 0) 100%
  );

  .music-lyric-items {
    text-align: center;
    font-size: 16px;
    transform: translate3d(0, 0, 0);
    transition: transform 0.6s ease-out;
    color: white;

    .on {
      color: #1ecf9d;
    }
  }
}

@media (max-width: 800px) {
  .music-info {
    display: none;
  }
  .music-lyric {
    top: 0;
  }
}
</style>
