import styled from 'styled-components'
import Image from 'next/image'
import { faFlag, faUser } from '@fortawesome/free-regular-svg-icons'
import { faBullhorn, faChartSimple } from '@fortawesome/free-solid-svg-icons'
import LeftColumnButton from '../molecules/left-column-button'
import logo from '../../public/assets/ravoratory.svg'
import { MouseEvent } from 'react'
import { useRouter } from 'next/router'

interface LeftColumnProps {}

const LeftColumn = (props: LeftColumnProps) => {
  const router = useRouter()
  const onclick = (label: string) => (event: MouseEvent<HTMLButtonElement>) => {
    router.push(label)
  }
  const columnProps = [
    {
      text: 'PROBLEMS',
      icon: faFlag,
      onClick: onclick('/problems'),
    },
    {
      text: 'NOTICE',
      icon: faBullhorn,
      onClick: onclick('/notice'),
    },
    {
      text: 'RANKING',
      icon: faChartSimple,
      onClick: onclick('/ranking'),
    },
    {
      text: 'PROFILE',
      icon: faUser,
      onClick: onclick('/profile'),
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
