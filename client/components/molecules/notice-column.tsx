import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import remarkGfm from 'remark-gfm'
import color from '../../theme/color'

interface NoticeProps {
  title: string
  body: string
  created_at?: string
}

const Notice = (props: NoticeProps) => {
  const time = new Date(props.created_at ?? '2022-01-01').toLocaleDateString(
    'ja-JP',
  )
  return (
    <Container>
      <h3>{props.title}</h3>
      <Card>
        {time}
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{props.body}</ReactMarkdown>
      </Card>
    </Container>
  )
}

export default Notice

const Container = styled.div`
  width: 100%;
  & h3 {
    color: ${color.gray};
  }
`

const Card = styled.div`
  padding: 28px 24px 20px;
  border-radius: 8px;
  box-shadow: inset -5px 5px 10px rgba(35, 35, 35, 0.2),
    inset 5px -5px 10px rgba(35, 35, 35, 0.2),
    inset -5px -5px 10px rgba(65, 65, 65, 0.9),
    inset 5px 5px 12px rgba(35, 35, 35, 0.9);

  & a {
    color: skyblue;
  }
  & code {
    background-color: #727272;
    color: ${color.orange};
  }
`
