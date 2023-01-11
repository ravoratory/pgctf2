import { ComponentStory, ComponentMeta } from '@storybook/react'
import LeftColumnButton from '../components/molecules/left-column-button'

export default {
  title: 'molecules/LeftButton',
  component: LeftColumnButton,
  argTypes: {
    text: { control: 'text' },
  },
} as ComponentMeta<typeof LeftColumnButton>

const Template: ComponentStory<typeof LeftColumnButton> = (args) => (
  <LeftColumnButton {...args} />
)

export const LeftColumn = Template.bind({})
LeftColumn.args = {
  text: 'Welcome',
}
