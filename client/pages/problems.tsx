import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useSession } from 'next-auth/react'
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
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/quizzes/`,
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
  if (status === 'authenticated') {
    console.log(data)
    const problems =
      data !== undefined
        ? data.reduce(
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
          )
        : []
    return (
      <Container>
        <LeftColumn />
        <RightColumn problems={problems} />
      </Container>
    )
  }

  return <></>
}

export default Problems

const Container = styled.div`
  display: flex;
  gap: 40px;
  padding: 32px;
`