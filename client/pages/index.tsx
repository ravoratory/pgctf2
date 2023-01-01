import Head from 'next/head'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import styled from 'styled-components'
import logo from '../public/assets/ravoratory.svg'
import TopButton from '../components/atoms/top-button'

const Home = () => {
  return (
    <Container>
      <Head>
        <title>PGCTF2</title>
        <meta name="description" content="CTF portal on PlayGround." />
        <link rel="icon" href="/assets/ravoratory.svg" />
      </Head>
      <Main>
        <Image
          src={logo}
          alt="ravoratory logo"
          width={320}
          height={242}
        ></Image>
        <h1>PGCTF2</h1>
        <TopButton
          onClick={() =>
            signIn('PGrit', { callbackUrl: 'http://localhost:3000/problems' })
          }
          text="Sign in with PGrit"
        />
      </Main>

      <Footer>
        Presented by <a href="https://github.com/ravoratory">Ravoratory</a>
      </Footer>
    </Container>
  )
}

export default Home

const Container = styled.div`
  margin-top: 100px;
  display: flex;
  gap: 60px;
  flex-direction: column;
  align-items: center;
`

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 64px;
  & > h1 {
    font-size: 64px;
  }
`

const Footer = styled.footer`
  position: absolute;
  bottom: 20px;
`
