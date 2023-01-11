import styled from 'styled-components'
import color from '../../theme/color'

interface TopButtonProps {
  text: string
  onClick?: () => {}
}

const TopButton = (props: TopButtonProps) => {
  return (
    <Button onClick={props.onClick}>
      <Text>{props.text}</Text>
    </Button>
  )
}

export default TopButton

const Button = styled.button`
  display: flex;
  width: 354px;
  height: 58px;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: ${color.black};
  margin: 8px 24px;
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
  font-size: 32px;
  font-weight: bold;
  font-family: 'Noto Sans JP';
  color: transparent;
  background: repeating-linear-gradient(135deg, #cc2b80 0, #d18059 100%);
  background-clip: text;
  -webkit-background-clip: text;
`
