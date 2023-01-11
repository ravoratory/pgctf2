import { ComponentStory, ComponentMeta } from '@storybook/react'
import ProblemCard from '../components/molecules/problem-card'

export default {
  title: 'molecules/LeftButton',
  component: ProblemCard,
  argTypes: {
    title: { control: 'text' },
    difficulty: { control: 'number' },
    points: { control: 'number' },
    solved: { control: 'boolean' },
  },
} as ComponentMeta<typeof ProblemCard>

const Template: ComponentStory<typeof ProblemCard> = (args) => (
  <ProblemCard {...args} />
)

export const Problem = Template.bind({})
Problem.args = {
  title: 'Welcome',
  difficulty: 1,
  points: 40000,
  solved: false,
}
