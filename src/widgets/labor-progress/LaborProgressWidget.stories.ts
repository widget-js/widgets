import LaborProgressWidget from './LaborProgressWidget.vue';

export default {
  title: 'Widget/LaborProgress',
  component: LaborProgressWidget,
  argTypes: {},
};

export const Widget = (args:any) => ({
  components: {LaborProgressWidget},
  setup() {
    return {args};
  },
  template: '<labor-progress-widget v-bind="args"></labor-progress-widget>',
});

Widget.parameters  = {
  design: [
    {
      name: "蓝湖",
      type: "link",
      url: "TODO改为蓝湖地址",
    }
  ],
}
