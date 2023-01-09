import styled from 'styled-components'
import color from '../../theme/color'

import ProblemsChart from '../molecules/rader-chart'

interface MyPageProps {
  username: string
  points: number
  solved_quizzes: any[]
  radar: any[]
}

const Mypage = (props: MyPageProps) => {
  return (
    <Container>
      <Name>
        <span>{props.username}</span>
        <span>[ {props.points} pts ] </span>
      </Name>
      <Title>Solved problems</Title>
      <ProblemsBox>
        <ChartView>
          <ProblemsChart data={props.radar} />
        </ChartView>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>title</th>
              <th>clear date</th>
              <th>category</th>
              <th>level</th>
              <th>points</th>
            </tr>
          </thead>
          <tbody>
            {props.solved_quizzes?.map((d, idx) => {
              return (
                <tr key={`${d.title}-${d.number}`}>
                  <td>{d.number}</td>
                  <td>
                    <a>{d.title}</a>
                  </td>
                  <td>{new Date(d.solved_at).toLocaleString()}</td>
                  <td>{d.category}</td>
                  <td>{d.difficulty}</td>
                  <td>{d.points}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </ProblemsBox>
    </Container>
  )
}

export default Mypage

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const ProblemsBox = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: inset -5px 5px 10px rgba(35, 35, 35, 0.2),
    inset 5px -5px 10px rgba(35, 35, 35, 0.2),
    inset -5px -5px 10px rgba(65, 65, 65, 0.9),
    inset 5px 5px 12px rgba(35, 35, 35, 0.9);
`

const Table = styled.table`
  border-collapse: collapse;
  & thead {
    border-bottom: 2px ${color.gray} solid;
  }
  tbody tr {
    border-bottom: 1px #42484d solid;
  }
  th {
    font-size: 24px;
    font-weight: bold;
    text-align: start;
    padding: 8px;
  }
  td {
    font-size: 20px;
    padding: 8px;
    line-height: 36px;
    a {
      color: ${color.blue};
    }
  }
`

const ChartView = styled.div`
  width: 100%;
  height: 300px;
`
const Name = styled.div`
  padding: 8px;
  width: 40%;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 32px;
`

const Title = styled.span`
  font-size: 24px;
  font-weight: bold;
  padding: 8px;
  color: ${color.gray};
`
