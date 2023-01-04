import styled from 'styled-components'
import Notice from '../molecules/notice-column'

interface NoticeProps {
  title: string
  body: string
  created_at: string
}

interface NoticesProps {
  notices: NoticeProps[]
}

const Notices = (props: NoticesProps) => {
  const welcomeBody =
    'うぇるかむかも～ん！\n\n' +
    'CTFとはなにかわからない方は[こちら](https://cybersecurity-jp.com/column/33780)を参照してください。\n\n' +
    '各問題から`pgctf{\\w+}`形式のflagを見つけてください。\n\n' +
    '点数は多くの人が解いた問題ほど低くなるようになっています。\n\n' +
    '指定された場所以外への攻撃はしないでください。\n\n' +
    '問題は随時追加していく予定です。\n\n' +
    '新しい問題が公開された際はこのページでお知らせします。\n\n' +
    '問題やこのサイトについての質問・要望は[@takumah](https://community.4nonome.com/web/accounts/3)または[@Konomura](https://community.4nonome.com/web/accounts/30)まで'

  return (
    <Container>
      <Notice title="WELCOME" body={welcomeBody}></Notice>
      {props.notices.map((notice, idx) => {
        return <Notice key={`notice-${idx}`} {...notice}></Notice>
      })}
    </Container>
  )
}

export default Notices

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 32px;
`
