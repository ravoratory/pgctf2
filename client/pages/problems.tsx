import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { getSession, GetSessionParams, useSession } from 'next-auth/react'
import styled from 'styled-components'
import useSWR from 'swr'

import LeftColumn from '../components/organisms/left-column'
import RightColumn from '../components/organisms/problems'

const Problems = (props: any) => {
  const router = useRouter()
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/')
    },
  })

  const [problemId, setProblemId] = useState<string>('')
  const { data, error } = useSWR(
    problemId !== ''
      ? `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/quizzes/${problemId}`
      : null,
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
  if (status === 'authenticated') {
    return (
      <>
        <Head>
          <title>Problems</title>
        </Head>
        <Container>
          <LeftColumn />
          {
            <RightColumn
              problems={props.data.reduce(
                (
                  prev: { [x: string]: any[] },
                  curr: { category: string | number },
                ) => {
                  if (prev[curr.category] === undefined) {
                    prev[curr.category] = []
                  }
                  prev[curr.category].push(curr)
                  return prev
                },
                {},
              )}
              problemContent={data}
              setProblemId={setProblemId}
            />
          }
        </Container>
      </>
    )
  }

  return <div>loading...</div>
}

export const getServerSideProps = async (
  context: GetSessionParams | undefined,
) => {
  const session = await getSession(context)
  if (!session) {
    return { props: { data: [] } }
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/quizzes/`,
    {
      credentials: 'include',
      headers: {
        Authorization: `Token ${session.accessKey}`,
      },
    },
  )
  const data = res.ok ? await res.json() : []
  return { props: { data } }
}

export default Problems

const Container = styled.div`
  display: flex;
  gap: 40px;
  padding: 32px;
`
