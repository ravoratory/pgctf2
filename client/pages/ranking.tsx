import { useRouter } from 'next/router'
import styled from 'styled-components'
import { getSession, GetSessionParams, useSession } from 'next-auth/react'
import useSWR from 'swr'
import LeftColumn from '../components/organisms/left-column'
import RightColumn from '../components/organisms/ranking'
import Head from 'next/head'

const Rankings = (props: any) => {
  const router = useRouter()
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/')
    },
  })

  const { data: line, error: lineError } = useSWR(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/ranking/chart/line`,
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
          <title>Ranking</title>
        </Head>
        <Container>
          <LeftColumn />
          {!lineError ? (
            <RightColumn line={line} data={props.data ?? []} />
          ) : (
            <div>loading...</div>
          )}
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
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/ranking`,
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

export default Rankings

const Container = styled.div`
  display: flex;
  gap: 40px;
  padding: 32px;
`
