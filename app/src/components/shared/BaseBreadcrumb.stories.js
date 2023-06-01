import BaseBreadcrumb from './BaseBreadcrumb.vue'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
export default {
  title: 'BaseBreadcrumb',
  component: BaseBreadcrumb,
  tags: ['autodocs'],
    argTypes: {
    title: String,
    breadcrumbs: Array,
    icon: String,
    onClick: {},
  },
}

// More on writing stories with args: https://storybook.js.org/docs/vue/writing-stories/args
export const Primary = {
  args: {
    primary: true,
    label: 'BaseBreadcrumb',
  },
}
