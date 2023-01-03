import { MouseEvent } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import flag from '../../public/assets/flag.svg'
import cleard from '../../public/assets/cleared.svg'
import color from '../../theme/color'

interface ProblemCardProps {
  title: string
  difficulty: number
  points: number
  solved: boolean
  onClick?: (e: MouseEvent) => {}
}

const ProblemCard = (props: ProblemCardProps) => {
  return (
    <Card onClick={props.onClick}>
      <Title>
        <div>
          <Text textColor={color.gray}>Title</Text>
          <Image
            src={props.solved ? cleard : flag}
            alt={props.solved ? 'solved' : 'challenge'}
            width={24}
            height={24}
          ></Image>
        </div>
        <Text size={32}>{props.title}</Text>
      </Title>
      <Info>
        <div>
          <Text textColor={color.gray}>Level</Text>
          <Text>{props.difficulty}</Text>
        </div>
        <div>
          <Text textColor={color.gray}>Point</Text>
          <Text>{props.points} pt</Text>
        </div>
      </Info>
    </Card>
  )
}

export default ProblemCard

const Card = styled.div`
  display: flex;
  width: 250px;
  height: 220px;
  border-radius: 8px;
  flex-direction: column;
  justify-content: space-between;
  color: ${color.white};
  background-color: ${color.black};
  padding: 28px;
  margin: 24px;
  box-shadow: -10px 10px 20px rgba(35, 35, 35, 0.2),
    10px -10px 20px rgba(35, 35, 35, 0.2),
    -10px -10px 20px rgba(65, 65, 65, 0.9), 10px 10px 25px rgba(35, 35, 35, 0.9);

  &:hover {
    box-shadow: -5px 5px 10px rgba(35, 35, 35, 0.2),
      5px -5px 10px rgba(35, 35, 35, 0.2), -5px -5px 10px rgba(65, 65, 65, 0.9),
      5px 5px 12px rgba(35, 35, 35, 0.9);
  }

  &:active {
    box-shadow: inset -5px 5px 10px rgba(35, 35, 35, 0.2),
      inset 5px -5px 10px rgba(35, 35, 35, 0.2),
      inset -5px -5px 10px rgba(65, 65, 65, 0.9),
      inset 5px 5px 12px rgba(35, 35, 35, 0.9);
  }
`

const Title = styled.div`
  & > div {
    display: flex;
    justify-content: space-between;
  }
`

const Info = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 40px;
  & > div {
    display: flex;
    flex-direction: column;
  }
`

const Text = styled.span<{ size?: number; textColor?: string }>`
  color: ${({ textColor }) => textColor ?? color.white};
  font-size: ${({ size }) => size ?? 20}px;
  font-weight: bold;
  display: -webkit-box;
  overflow: hidden;
  overflow-wrap: break-word;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
`
