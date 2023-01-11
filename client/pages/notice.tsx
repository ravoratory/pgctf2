import Head from 'next/head'
import { useRouter } from 'next/router'
import { getSession, GetSessionParams, useSession } from 'next-auth/react'

import styled from 'styled-components'

import LeftColumn from '../components/organisms/left-column'
import Notices from '../components/organisms/notice'

const NoticesPage = (props: any) => {
  const router = useRouter()
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/')
    },
  })
  if (status === 'authenticated') {
    return (
      <>
        <Head>
          <title>Notice</title>
        </Head>
        <Container>
          <LeftColumn></LeftColumn>
          <Notices notices={props.data}></Notices>
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
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/announces/`,
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

export default NoticesPage

const Container = styled.div`
  display: flex;
  gap: 40px;
  padding: 32px;
`
