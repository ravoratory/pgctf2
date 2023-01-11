import { useRouter } from 'next/router'
import { MouseEvent } from 'react'
import styled from 'styled-components'
import color from '../../theme/color'

interface RankingColumnProps {
  username: string
  points: number
  last_solved?: string
}

const RankingColumn = (props: RankingColumnProps) => {
  const router = useRouter()
  const onClick = (e: MouseEvent) => {
    router.push(`/users/${props.username}`)
  }
  return (
    <Button onClick={onClick} type="button">
      <User>{props.username}</User>
      <div>
        <Text>
          Last Solved:{' '}
          {props.last_solved
            ? new Date(props.last_solved).toLocaleString()
            : '-'}
        </Text>
        <Text>{props.points ?? 0} point</Text>
      </div>
    </Button>
  )
}

export default RankingColumn

const Button = styled.button`
  display: flex;
  width: 100%;
  height: 56px;
  border: none;
  border-radius: 8px;
  justify-content: space-between;
  gap: 8px;
  align-items: center;
  background-color: ${color.black};
  padding: 12px 24px;
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
  & > div {
    width: 50%;
    display: flex;
    justify-content: space-between;
  }
`

const User = styled.span`
  color: ${color.blue};
  font-size: 20px;
  font-weight: bold;
  font-family: 'Noto Sans JP';
`

const Text = styled.span`
  user-select: none;
  color: ${color.white};
  font-size: 20px;
  font-weight: bold;
  font-family: 'Noto Sans JP';
`
