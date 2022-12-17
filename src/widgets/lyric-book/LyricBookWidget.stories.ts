import LyricBookWidget from './LyricBookWidget.vue';

export default {
  title: 'Widget/LyricBook',
  component: LyricBookWidget,
  argTypes: {},
};

export const Widget = (args:any) => ({
  components: {LyricBookWidget},
  setup() {
    return {args};
  },
  template: '<lyric-book-widget></lyric-book-widget>',
});
