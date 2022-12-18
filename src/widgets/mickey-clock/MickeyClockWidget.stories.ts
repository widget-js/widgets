import MickeyClockWidget from './MickeyClockWidget.vue';

export default {
  title: 'Widget/MickeyClock',
  component: MickeyClockWidget,
  argTypes: {},
};

export const Widget = (args:any) => ({
  components: {MickeyClockWidget},
  setup() {
    return {args};
  },
  template: '<mickey-clock-widget></mickey-clock-widget>',
});
