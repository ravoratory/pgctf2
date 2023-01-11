import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const RedirectPage: NextPage = () => {
  const router = useRouter()
  useEffect(() => {
    router.replace('/problems')
  }, [])

  return <div>ログインしています…</div>
}
export default RedirectPage
