import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface LineGraphProps {
  data?: {
    datetime: string[]
    points: { [name: string]: string[] }
    usernames: string[]
  }
}

const LineGraph = (props: LineGraphProps) => {
  const colors = [
    '#fd7f6f',
    '#7eb0d5',
    '#b2e061',
    '#bd7ebe',
    '#ffb55a',
    '#ffee65',
    '#beb9db',
    '#fdcce5',
    '#8bd3c7',
    '#3c95ed',
  ]
  const data = props.data?.datetime.map((d, idx) => {
    const r: { [key: string]: string | number | null | undefined } = { time: d }
    for (const user of props.data?.usernames ?? []) {
      r[user] =
        props.data?.points[user][idx] === 'NaN'
          ? null
          : props.data?.points[user][idx]
    }
    return r
  })
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip labelStyle={{ color: 'black' }} />
        <Legend />
        {props.data?.usernames.map((user, idx) => {
          return (
            <Area
              key={user}
              type="linear"
              dataKey={user}
              connectNulls={true}
              dot={false}
              strokeWidth={3}
              stroke={colors[idx]}
              fill={colors[idx]}
              fillOpacity={0.2}
            />
          )
        })}
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default LineGraph
