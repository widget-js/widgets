import TimeProgressWidget from './TimeProgressWidget.vue';

export default {
  title: 'Widget/TimeProgress',
  component: TimeProgressWidget,
  argTypes: {},
};

export const Widget = (args) => ({
  components: {TimeProgressWidget},
  setup() {
    return {args};
  },
  template: '<time-progress-widget v-bind="args"></time-progress-widget>',
});


const Primary = Widget.bind();

Primary.args = {
  locale: "zh-cn",
  isLunar: false
}
