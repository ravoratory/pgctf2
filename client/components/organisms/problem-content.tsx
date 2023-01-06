import Head from 'next/head'
import styled from 'styled-components'
import color from '../../theme/color'

interface ProblemProps {
  number: string
  title: string
  difficulty: number
  statement: string
  points: number
  solved: boolean
  links: string[]
}

const Problem = (props: ProblemProps) => {
  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <Container>
        <Info>
          <InfoText>Level: {props.difficulty}</InfoText>
          <InfoText>Point: {props.points}pt</InfoText>
        </Info>
        <Statement>
          <Title>{props.title}</Title>
          {props.statement}
        </Statement>

        <form method="post">
          <label htmlFor="flag">Flag:</label>
          <input id="flag" name="flag" type="text" required />
          <button type="submit">Submit</button>
        </form>
      </Container>
    </>
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
const Info = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  gap: 32px;

  width: 240px;
  height: 38px;

  background: ${color.black};
  border-radius: 8px;
  border: 1px solid #cc2b80;
  border-image: linear-gradient(135deg, #cc2b80 14.64%, #d18059 85.36%);
  border-image-slice: 1;
`
const InfoText = styled.span`
  font-weight: bold;
`
const Statement = styled.div``
const Title = styled.h2``
