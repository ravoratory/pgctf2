import styled from 'styled-components'
import ProblemCard from '../molecules/problem-card'
import color from '../../lib/color'

interface CategoryProps {
  category: string
  problems: { title: string; level: number; point: number; solved: boolean }[]
}

interface ProblemProps {}

const Problem = (props: ProblemProps) => {
  const mockData = [
    {
      category: 'welcome',
      problems: [
        { title: 'meshitero', level: 1, point: 40000, solved: true },
        { title: 'meshitero', level: 2, point: 40000, solved: false },
        { title: 'meshitero', level: 1, point: 40000, solved: false },
        { title: 'meshitero', level: 1, point: 40000, solved: false },
        { title: 'meshitero', level: 1, point: 40000, solved: false },
      ],
    },
    {
      category: 'welcome2',
      problems: [
        { title: 'meshitero', level: 1, point: 40000, solved: true },
        { title: 'meshitero', level: 2, point: 40000, solved: false },
        { title: 'meshitero', level: 2, point: 40000, solved: false },
        { title: 'meshitero', level: 2, point: 40000, solved: false },
        { title: 'meshitero', level: 2, point: 40000, solved: false },
        { title: 'meshitero', level: 2, point: 40000, solved: false },
        { title: 'meshitero', level: 2, point: 40000, solved: false },
      ],
    },
  ]

  return (
    <Container>
      {mockData.map((d) => {
        return (
          <Category key={d.category}>
            <Text>{d.category}</Text>
            <Problems>
              {d.problems.map((p, idx) => (
                <ProblemCard key={`${p.title}-${idx}`} {...p}></ProblemCard>
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
