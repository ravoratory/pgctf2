import { MouseEventHandler } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-regular-svg-icons'
import color from '../../lib/color'

interface LeftColumnButtonProps {
  text: string
  icon: IconDefinition
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const LeftColumnButton = (props: LeftColumnButtonProps) => {
  return (
    <Button onClick={props.onClick} type="button">
      <FontAwesomeIcon icon={props.icon} color={color.white} />
      <Text>{props.text}</Text>
    </Button>
  )
}

export default LeftColumnButton

const Button = styled.button`
  display: flex;
  width: 256px;
  height: 56px;
  border: none;
  border-radius: 42px;
  justify-content: flex-start;
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
`

const Text = styled.span`
  user-select: none;
  color: ${color.white};
  font-size: 20px;
  font-weight: bold;
  font-family: 'Noto Sans JP';
`
