import GlitchWidget from './GlitchWidget.vue';

export default {
  title: 'Widget/Glitch',
  component: GlitchWidget,
  argTypes: {},
};

export const Widget = (args:any) => ({
  components: {GlitchWidget},
  setup() {
    return {args};
  },
  template: '<glitch-widget></glitch-widget>',
});
