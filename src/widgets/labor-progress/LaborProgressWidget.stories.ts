import LaborProgressWidget from './LaborProgressWidget.vue';

export default {
    title: 'Widget/LaborProgress',
    component: LaborProgressWidget,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
};

export const Default = (args: any, { argTypes }) => ({
    components: {LaborProgressWidget},
    setup() {
        return {args};
    },
    template: '<labor-progress-widget v-bind="args"></labor-progress-widget>',
});
