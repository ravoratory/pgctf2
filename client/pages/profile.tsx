import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import useSWR from 'swr'
import LeftColumn from '../components/organisms/left-column'
import Mypage from '../components/organisms/mypage'

const ProblemPage = () => {
  const router = useRouter()
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/')
    },
  })
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/users/self`,
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
  const { data: radar, error: err2 } = useSWR(
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
  if (!error && !err2) {
    const solved = data?.solved_quizzes.reduce(
      (prev: { [key: string]: number }, curr: { [key: string]: any }) => {
        if (!prev[curr.category]) {
          prev[curr.category] = 0
        }
        prev[curr.category]++
        return prev
      },
      {},
    )
    if (data) {
      data.radar = radar?.map((d: { [key: string]: any }) => {
        return {
          subject: d.name,
          A: d.count !== 0 ? (solved[d.name] ?? 0) / d.count : 0,
          fullmark: 1,
        }
      })
    }
  }
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
