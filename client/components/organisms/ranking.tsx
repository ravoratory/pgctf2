import color from '../../theme/color'
import styled from 'styled-components'
import RankingColumn from '../molecules/ranking-column'
import LineGraph from '../molecules/line-chart'

interface RankingProps {
  data: { rank: number; username: string; points: number }[]
  line: {
    datetime: string[]
    points: { [name: string]: string | number[] }
    usernames: string[]
  }
}

const Ranking = (props: RankingProps) => {
  const pr = new Intl.PluralRules('en-US', { type: 'ordinal' })

  const suffixes = new Map([
    ['one', 'st'],
    ['two', 'nd'],
    ['few', 'rd'],
    ['other', 'th'],
  ])
  const formatOrdinals = (n: number): string => {
    const rule = pr.select(n)
    const suffix = suffixes.get(rule)
    return `${n}${suffix}`
  }
  return (
    <RankingBoard>
      <GraphContainer>
        <LineGraph data={props.line} />
      </GraphContainer>
      {props.data.map((d, idx) => {
        return (
          <Column key={`rank-${d.rank}-${idx}`}>
            <h3>{formatOrdinals(d.rank)}</h3>
            <RankingColumn {...d} />
          </Column>
        )
      })}
    </RankingBoard>
  )
}

export default Ranking

const GraphContainer = styled.div`
  width: 100%;
  height: 750px;
`

const Column = styled.div`
  display: flex;
  align-items: center;
  & > h3 {
    width: 32px;
    color: ${color.gray};
  }
`
const RankingBoard = styled.div`
  width: 100%;
`
