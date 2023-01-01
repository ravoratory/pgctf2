import { ComponentStory, ComponentMeta } from '@storybook/react'
import LeftColumn from '../components/organisms/left-column'

export default {
  title: 'organisms/LeftColumn',
  component: LeftColumn,
  argTypes: {},
} as ComponentMeta<typeof LeftColumn>

const Template: ComponentStory<typeof LeftColumn> = (args) => (
  <LeftColumn {...args} />
)

export const Column = Template.bind({})
Column.args = {}
