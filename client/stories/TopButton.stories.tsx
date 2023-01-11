import { ComponentStory, ComponentMeta } from '@storybook/react'
import TopButton from '../components/atoms/top-button'

export default {
  title: 'atoms/Button',
  component: TopButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    text: { control: 'text' },
  },
} as ComponentMeta<typeof TopButton>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TopButton> = (args) => (
  <TopButton {...args} />
)

export const SignIn = Template.bind({})
SignIn.args = {
  text: 'Sign in with PGrit',
}
