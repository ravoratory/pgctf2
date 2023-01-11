import { NextPageContext } from 'next'
import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import useSWR from 'swr'
import LeftColumn from '../../components/organisms/left-column'
import Mypage from '../../components/organisms/mypage'
const ProblemPage = () => {
  const router = useRouter()
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/')
    },
  })
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/users/${router.query.username}`,
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
  console.log(data, error)
  return (
    <Container>
      <LeftColumn />
      {!error ? <Mypage {...data} /> : <div>loading...</div>}
    </Container>
  )
}
export default ProblemPage

const Container = styled.div`
  display: flex;
  gap: 40px;
  padding: 32px;
  width: 100%;
  height: 100vh;
`
