import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import styled from 'styled-components'
import useSWR from 'swr'

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
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/announces/`,
    async (url: string) => {
      const r = await fetch(url, {
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${session?.accessKey}`,
        },
      })
      return r.json()
    },
  )

  console.log(data)
  return (
    <Container>
      <LeftColumn></LeftColumn>
      <Notices notices={data ?? []}></Notices>
    </Container>
  )
}

export default NoticesPage

const Container = styled.div`
  display: flex;
  gap: 40px;
  padding: 32px;
`
