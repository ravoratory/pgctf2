import { useState, FormEvent } from 'react'
import { useSession } from 'next-auth/react'

import styled from 'styled-components'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { parseCookies } from 'nookies'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import color from '../../theme/color'

export interface ProblemProps {
  number: string
  title: string
  difficulty: number
  statement: string
  points: number
  solved: boolean
  files: { file: string; title: string }[]
  urls: { url: string; title: string }[]
  winners: number
}

const Problem = (props: ProblemProps) => {
  const cookies = parseCookies()
  const router = useRouter()
  const session = useSession()
  const [error, setError] = useState<string>('')
  const [solved, setSolved] = useState<boolean>(props.solved)
  const onSubmit = async (e: FormEvent): Promise<boolean | void> => {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    if (form.flag.value.match(/^pgctf{\w*}$/) === null) {
      setError('invalid flag!')
      return false
    }
    await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/quizzes/${router.query.numbers}/answer`,
      {
        method: 'post',
        mode: 'cors',
        credentials: 'include',
        referrerPolicy: 'origin-when-cross-origin',
        headers: {
          Authorization: `Token ${session.data?.accessKey}`,
          'Content-Type': 'application/json',
          'X-CSRFToken': `${cookies.csrftoken}`,
        },
        body: JSON.stringify({ flag: form.flag.value }),
      },
    )
      .then(async (e) => {
        const data = await e.json()
        if (data.correct) {
          setSolved(true)
        } else {
          setSolved(false)
          setError('Flag is not correct!')
        }
      })
      .catch((err) => {
        console.error(err)
      })
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
          <InfoText>Solved: {props.winners ?? 0}</InfoText>
        </Info>
        <Statement>
          <Title>{props.title}</Title>
          <ReactMarkdown
            children={props.statement}
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeRaw, rehypeKatex]}
            components={{
              code({ node, inline, className, children, style, ...props }) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, '')}
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              },
            }}
          />
          <Links>
            {props.files?.map((link, idx) => {
              return (
                <p key={`link-${link.title}-${idx}`}>
                  <a
                    href={link.file}
                    target="_blank"
                    rel="noreferrer noopener"
                    download
                  >
                    {link.title}
                  </a>
                </p>
              )
            })}
            {props.urls?.map((url, idx) => {
              return (
                <p key={`url-${url.title}-${idx}`}>
                  <a href={url.url} target="_blank" rel="noreferrer noopener">
                    {url.title}
                  </a>
                </p>
              )
            })}
          </Links>
        </Statement>
        {!solved ? (
          <>
            <Form method="POST" id="solution" onSubmit={onSubmit}>
              <label htmlFor="flag">Flag</label>
              <div>
                <input id="flag" name="flag" type="text" required />
                <button type="submit">Submit</button>
              </div>
            </Form>
            <ErrorContainer>{error}</ErrorContainer>
          </>
        ) : (
          <Solved>Great! You have solved this Problem!</Solved>
        )}
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
  padding: 16px;
`
const Info = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  gap: 32px;

  width: 350px;
  height: 38px;

  background: ${color.black};
  border-radius: 8px;
  border: 1px solid ${color.blue};
`
const InfoText = styled.span`
  font-weight: bold;
`
const Statement = styled.div`
  & a {
    color: skyblue;
  }
  & code {
    background-color: #4c4c4c;
    color: ${color.orange};
  }
`

const Form = styled.form`
  display: flex;
  gap: 8px;
  flex-direction: column;
  label {
    font-size: 24px;
    font-weight: bold;
    color: ${color.gray};
  }
  div {
    display: flex;
    height: 60px;
    gap: 16px;
  }

  input {
    width: 600px;
    border: none;
    padding: 24px 16px;
    border-radius: 8px;
    font-size: 16px;
    box-shadow: inset -5px 5px 10px rgba(35, 35, 35, 0.2),
      inset 5px -5px 10px rgba(35, 35, 35, 0.2),
      inset -5px -5px 10px rgba(65, 65, 65, 0.9),
      inset 5px 5px 12px rgba(35, 35, 35, 0.9);
  }
  button {
    width: 96px;
    background-color: ${color.black};
    border: none;
    border-radius: 8px;
    font-size: 16px;
    box-shadow: -10px 10px 20px rgba(35, 35, 35, 0.2),
      10px -10px 20px rgba(35, 35, 35, 0.2),
      -10px -10px 20px rgba(65, 65, 65, 0.9),
      10px 10px 25px rgba(35, 35, 35, 0.9);

    &:hover {
      box-shadow: -5px 5px 10px rgba(35, 35, 35, 0.2),
        5px -5px 10px rgba(35, 35, 35, 0.2),
        -5px -5px 10px rgba(65, 65, 65, 0.9), 5px 5px 12px rgba(35, 35, 35, 0.9);
    }

    &:active {
      box-shadow: inset -5px 5px 10px rgba(35, 35, 35, 0.2),
        inset 5px -5px 10px rgba(35, 35, 35, 0.2),
        inset -5px -5px 10px rgba(65, 65, 65, 0.9),
        inset 5px 5px 12px rgba(35, 35, 35, 0.9);
    }
  }
`

const Title = styled.h2``

const Links = styled.div`
  display: flex;
  gap: 8px;
`
const Solved = styled.p`
  color: ${color.green};
  font-size: 24px;
`

const ErrorContainer = styled.div`
  color: ${color.orange};
`
