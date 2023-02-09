import { getSession, GetSessionParams, useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import useSWR from 'swr'
import LeftColumn from '../components/organisms/left-column'
import Mypage from '../components/organisms/mypage'

const ProblemPage = (props: any) => {
  const router = useRouter()
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/')
    },
  })
  const { data: radar, error } = useSWR(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/categories`,
    async (url: string) => {
      const res = await fetch(url, {
        credentials: 'include',
        headers: {
          Authorization: `Token ${session?.accessKey}`,
        },
      })
      if (!res.ok) {
        throw !res.ok
      }
      return res.json()
    },
  )
  if (!error) {
    const solved = props.data?.solved_quizzes.reduce(
      (prev: { [key: string]: number }, curr: { [key: string]: any }) => {
        if (!prev[curr.category]) {
          prev[curr.category] = 0
        }
        prev[curr.category]++
        return prev
      },
      {},
    )
    if (props.data) {
      props.data.chart = radar?.map((d: { [key: string]: any }) => {
        return {
          subject: d.name,
          ratio: d.count !== 0 ? (solved[d.name] ?? 0) / d.count : 0,
          fullmark: 1,
        }
      })
    }
  }
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Container>
        <LeftColumn />
        {!error ? <Mypage {...props.data} /> : <div>loading...</div>}
      </Container>
    </>
  )
}

export const getServerSideProps = async (
  context: GetSessionParams | undefined,
) => {
  const session = await getSession(context)
  if (!session) {
    return { props: { data: [] } }
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/users/self`,
    {
      credentials: 'include',
      headers: {
        Authorization: `Token ${session.accessKey}`,
      },
    },
  )
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
