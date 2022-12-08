import CountDownWidget from './CountDownWidget.vue';

export default {
  title: 'Widget/Countdown',
  component: CountDownWidget,
  argTypes: {},
  parameters: {
    sourceLink: 'https://baidy.com',
    sourceLinkPrefix: 'hhh'
  }
};

export const Widget = (args) => ({
  components: {CountDownWidget},
  setup() {
    return {args};
  },
  parameters: {
    sourceLink: 'https://baidy.com',
    sourceLinkPrefix: 'hhh'
  },
  template: '<count-down-widget></count-down-widget>',
});


