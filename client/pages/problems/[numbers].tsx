import { FormEvent } from 'react'
import { NextPageContext } from 'next'
import { getSession, useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import LeftColumn from '../../components/organisms/left-column'
import ProblemContent from '../../components/organisms/problem-content'

const ProblemPage = (props: any) => {
  const router = useRouter()
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/')
    },
  })
  return (
    <>
      <Head>
        <title>Problems</title>
      </Head>
      <Container>
        <LeftColumn />
        {props.data ? (
          <ProblemContent {...props.data} />
        ) : (
          <div>loading...</div>
        )}
      </Container>
    </>
  )
}
export const getServerSideProps = async (context: NextPageContext) => {
  const session = await getSession(context)
  if (!session) {
    return { props: { data: [] } }
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/quizzes/${context.query.numbers}`,
    {
      credentials: 'include',
      headers: {
        Authorization: `Token ${session?.accessKey}`,
      },
    },
  )
  if (!res.ok) {
    throw !res.ok
  }
  if (!res.ok) {
    throw !res.ok
  }
  const data = await res.json()
  return { props: { data } }
}
export default ProblemPage

const Container = styled.div`
  display: flex;
  gap: 40px;
  padding: 32px;
  width: 100%;
  height: 100vh;
`
