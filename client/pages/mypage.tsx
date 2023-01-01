import styled from 'styled-components'
import LeftColumn from '../components/organisms/left-column'
import Mypage from '../components/organisms/mypage'
const ProblemPage = () => {
  return (
    <Container>
      <LeftColumn />
      <Mypage />
    </Container>
  )
}

export default ProblemPage

const Container = styled.div`
  display: flex;
  gap: 40px;
  padding: 32px;
  width: 100%;
  height: 100vh;
`
