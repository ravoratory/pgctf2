import { FormEvent } from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import { useSession } from 'next-auth/react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import color from '../../theme/color'

interface ProblemProps {
  number: string
  title: string
  difficulty: number
  statement: string
  points: number
  solved: boolean
  files: { file: string; title: string }[]
  urls: { url: string; title: string }[]
}

const Problem = (props: ProblemProps) => {
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const res = await fetch('', {
      credentials: 'include',
      headers: {
        Authorization: `Token`,
      },
    })
    console.log(res)
  }
  return (
    <>
      <Head>
        <title>{props.number}</title>
      </Head>
      <Container>
        <Info>
          <InfoText>Level: {props.difficulty}</InfoText>
          <InfoText>Point: {props.points}pt</InfoText>
        </Info>
        <Statement>
          <Title>{props.title}</Title>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {props.statement}
          </ReactMarkdown>
          <Links>
            {props.files?.map((link, idx) => {
              return (
                <a key={`link-${link.title}-${idx}`} href={link.file}>
                  {link.title}
                </a>
              )
            })}
            {props.urls?.map((url, idx) => {
              return (
                <a key={`url-${url.title}-${idx}`} href={url.url}>
                  {url.title}
                </a>
              )
            })}
          </Links>
        </Statement>

        <form method="post" onSubmit={onSubmit}>
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
const Statement = styled.div`
  & a {
    color: skyblue;
  }
  & code {
    background-color: #727272;
    color: ${color.orange};
  }
`
const Title = styled.h2``
const Links = styled.div`
  display: flex;
  gap: 8px;
`
