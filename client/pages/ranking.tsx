import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import LeftColumn from '../components/organisms/left-column'
import RightColumn from '../components/organisms/ranking'

const Rankings = (props: any) => {
  const router = useRouter()
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/')
    },
  })
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/ranking`,
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
    console.log(data)
    return (
      <Container>
        <LeftColumn />
        {!error && <RightColumn line={line} data={data ?? []} />}
      </Container>
    )
  }

  return <div>loading...</div>
}

export default Rankings

const Container = styled.div`
  display: flex;
  gap: 40px;
  padding: 32px;
`
