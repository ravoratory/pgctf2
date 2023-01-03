import styled from 'styled-components'
import ProblemCard from '../molecules/problem-card'
import color from '../../lib/color'

interface CategoryProps {
  [category: string]: {
    title: string
    difficulty: number
    points: number
    solved: boolean
  }[]
}

interface ProblemProps {
  problems: CategoryProps
}

const Problem = (props: ProblemProps) => {
  return (
    <Container>
      {Object.entries(props.problems).map(([category, problems]) => {
        return (
          <Category key={category}>
            <Text>{category}</Text>
            <Problems>
              {problems.map((problem, idx) => (
                <ProblemCard
                  key={`${problem.title}-${idx}`}
                  {...problem}
                ></ProblemCard>
              ))}
            </Problems>
          </Category>
        )
      })}
    </Container>
  )
}

export default Problem

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
`

const Category = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`
const Problems = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 290px);
  gap: 12px;
`

const Text = styled.span<{ size?: number; textColor?: string }>`
  color: ${({ textColor }) => textColor ?? color.gray};
  font-size: ${({ size }) => size ?? 20}px;
  font-weight: bold;
  display: -webkit-box;
  overflow: hidden;
  overflow-wrap: break-word;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
`
