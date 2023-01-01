import styled from 'styled-components'

import ProblemsChart from '../molecules/rader-chart'

interface MyPageProps {
  username?: string
  point?: number
  problems?: any[]
  chartData?: any[]
}

const Mypage = (props: MyPageProps) => {
  const data = {
    username: 'AYATO KADOTA',
    point: 2000,
    problems: [
      {
        title: 'meshitero',
        clearDate: '',
        category: 'web',
        level: 3,
        points: 3000,
      },
      {
        title: 'meshitero',
        clearDate: '2022/12/31',
        category: 'web',
        level: 3,
        points: 3000,
      },
      {
        title: 'meshitero',
        clearDate: '',
        category: 'web',
        level: 3,
        points: 3000,
      },
      {
        title: 'meshitero',
        clearDate: '',
        category: 'web',
        level: 3,
        points: 3000,
      },
    ],
    chartData: [
      { subject: 'pwnable', A: 50, fullmark: 100 },
      { subject: 'web', A: 90, fullmark: 100 },
      { subject: 'crypto', A: 20, fullmark: 100 },
      { subject: 'reversing', A: 30, fullmark: 100 },
      { subject: 'misc', A: 0, fullmark: 100 },
      { subject: 'steganography', A: 65, fullmark: 100 },
    ],
  }
  return (
    <Container>
      <div>
        {data.username} {data.point} pts
      </div>
      <span>solved problems</span>
      <ProblemsBox>
        <ChartView>
          <ProblemsChart></ProblemsChart>
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
            {data.problems.map((d, idx) => {
              return (
                <tr key={`${d.title}-${idx}`}>
                  <td></td>
                  <td>{d.title}</td>
                  <td>{d.clearDate}</td>
                  <td>{d.category}</td>
                  <td>{d.level}</td>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: inset -5px 5px 10px rgba(35, 35, 35, 0.2),
    inset 5px -5px 10px rgba(35, 35, 35, 0.2),
    inset -5px -5px 10px rgba(65, 65, 65, 0.9),
    inset 5px 5px 12px rgba(35, 35, 35, 0.9);
`

const Table = styled.table``

const ChartView = styled.div`
  width: 100%;
  height: 300px;
`
