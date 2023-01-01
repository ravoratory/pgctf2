import { ComponentStory, ComponentMeta } from '@storybook/react'
import ProblemCard from '../components/molecules/problem-card'

export default {
  title: 'molecules/LeftButton',
  component: ProblemCard,
  argTypes: {
    title: { control: 'text' },
    level: { control: 'number' },
    point: { control: 'number' },
    solved: { control: 'boolean' },
  },
} as ComponentMeta<typeof ProblemCard>

const Template: ComponentStory<typeof ProblemCard> = (args) => (
  <ProblemCard {...args} />
)

export const Problem = Template.bind({})
Problem.args = {
  title: 'Welcome',
  level: 1,
  point: 40000,
  solved: false,
}
