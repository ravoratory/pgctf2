import { MouseEvent, useState } from 'react'
import styled from 'styled-components'
import { Modal, useModal } from '@nextui-org/react'

import ProblemCard from '../molecules/problem-card'
import color from '../../theme/color'
import ProblemContent, { ProblemProps } from './problem-content'
interface CategoryProps {
  [category: string]: {
    number: string
    title: string
    difficulty: number
    points: number
    solved: boolean
  }[]
}

interface ProblemsProps {
  problems: CategoryProps
  problemContent?: ProblemProps
  setProblemId: (pid: string) => void
}

const Problem = (props: ProblemsProps) => {
  const [pid, setPid] = useState<string>('')
  const { setVisible, bindings } = useModal()

  const [showing, setShowing] = useState<boolean>(false)
  const onClose = () => {
    setVisible(false)
    setShowing(false)
  }
  const onClick = (problemId: string) => (e: MouseEvent) => {
    e.preventDefault()
    props.setProblemId(problemId)
    setPid(problemId)
    setVisible(true)
  }
  return (
    <Container>
      {Object.entries(props.problems).map(([category, problems]) => {
        return (
          <Category key={category}>
            <Text>{category}</Text>
            <Problems>
              {problems.map((problem, idx) => (
                <ProblemCard
                  onClick={onClick(problem.number)}
                  key={`${problem.title}-${idx}`}
                  {...problem}
                ></ProblemCard>
              ))}
            </Problems>
          </Category>
        )
      })}
      <Modal width="800px" noPadding {...bindings} onClose={onClose}>
        <Modal.Body>
          <ProblemContainer>
            {props.problemContent ? (
              <ProblemContent {...props.problemContent} />
            ) : (
              <></>
            )}
          </ProblemContainer>
        </Modal.Body>
      </Modal>
    </Container>
  )
}

export default Problem

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column-reverse;
  align-items: flex-start;
  gap: 40px;
  iframe {
    border: none;
  }
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
  gap: 8px;
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

const ProblemContainer = styled.div`
  display: flex;
  gap: 40px;
  padding: 32px;
  width: 100%;
  height: 100%;
  background-color: ${color.black};
  color: white;
`
