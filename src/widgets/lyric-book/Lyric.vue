<template>
  <div class="lyric">
    <!--封面-->
    <dl class="music-info">
      <dt>
        <img src="./img/player_cover.png"/>
      </dt>
      <dd>爱拼才会赢</dd>
      <dd class="author">歌手：叶启田</dd>
      <dd class="album">专辑：《闽南情歌大对唱》</dd>
    </dl>
    <!--歌词-->
    <div ref="musicLyric" class="music-lyric">
      <div class="music-lyric-items" :style="lyricTop">
        <template v-if="lyric.length > 0">
          <p
              v-for="(item, index) in lyric"
              :key="index"
              :class="{ on: lyricIndex === index }"
          >
            {{ item }}
          </p>
        </template>
        <p v-else>歌词加载失败！</p>
      </div>
    </div>
  </div>
</template>

<script lang="js">
export default {
  name: 'Lyric',
  props: {
    // 歌词数据
    lyric: {
      type: Array,
      default: () => []
    },
    // 是否无歌词
    nolyric: {
      type: Boolean,
      default: false
    },
    // 当前歌词下标
    lyricIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      top: 0 // 歌词居中
    }
  },
  computed: {
    lyricTop() {
      return `transform :translate3d(0, ${
          -34 * (this.lyricIndex - this.top)
      }px, 0)`
    },
  },
  mounted() {
    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimer)
      this.resizeTimer = setTimeout(() => this.clacTop(), 60)
    })
    this.$nextTick(() => this.clacTop())
  },
  methods: {
    // 计算歌词居中的 top值
    clacTop() {
      const dom = this.$refs.musicLyric
      const {display = ''} = window.getComputedStyle(dom)
      if (display === 'none') {
        return
      }
      const height = dom.offsetHeight
      this.top = Math.floor(height / 34/2)
    }
  }
}
</script>

<style lang="scss" scoped>
.lyric {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
}

.music-info {
  padding-bottom: 20px;
  text-align: center;
  font-size: 18px;

  .author,.album{
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
      background: url('./img/album_cover_player.png') 0 0 no-repeat;
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
  height: 80%;
  left: 0;
  max-height: 800px;
  overflow: hidden;
  text-align: center;
  mask-image: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0) 0,
          rgba(255, 255, 255, 0.6) 15%,
          rgba(255, 255, 255, 1) 25%,
          rgba(255, 255, 255, 1) 75%,
          rgba(255, 255, 255, 0.6) 85%,
          rgba(255, 255, 255, 0) 100%
  );

  .music-lyric-items {
    text-align: center;
    line-height: 34px;
    font-size: 16px;
    transform: translate3d(0, 0, 0);
    transition: transform 0.6s ease-out;
    color: white;

    .on {
      color: #1ecf9d;
    }
  }
}

// 当屏幕小于 960 时
@media (max-width: 960px) {
  .music-info {
    display: none;
  }
  .music-lyric {
    top: 0;
  }
}
</style>
