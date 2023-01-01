import styled from 'styled-components'
import Image from 'next/image'
import { faFlag, faUser } from '@fortawesome/free-regular-svg-icons'
import { faBullhorn, faChartSimple } from '@fortawesome/free-solid-svg-icons'
import LeftColumnButton from '../molecules/left-column-button'
import logo from '../../public/assets/ravoratory.svg'
import { MouseEvent } from 'react'

interface LeftColumnProps {}

const LeftColumn = (props: LeftColumnProps) => {
  const test = (event: MouseEvent<HTMLButtonElement>) => {
    console.log('Clicked!')
  }
  const columnProps = [
    {
      text: 'PROBLEMS',
      icon: faFlag,
      onClick: test,
    },
    {
      text: 'NOTICE',
      icon: faBullhorn,
      onClick: test,
    },
    {
      text: 'RANKING',
      icon: faChartSimple,
      onClick: test,
    },
    {
      text: 'PROFILE',
      icon: faUser,
      onClick: test,
    },
  ]

  return (
    <div>
      <Container>
        <Image src={logo} alt="logo" width={196} height={148} />
        <div>
          {columnProps.map((c) => {
            return <LeftColumnButton key={c.text} {...c} />
          })}
        </div>
      </Container>
    </div>
  )
}

export default LeftColumn

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  position: sticky;
  top: 32px;
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
`
