import MainLayout from '../src/components/mainlayout/mainlayout'
import '../styles/globals.css'
import '../styles/generals.sass'

export default function App({ Component, pageProps }) {
  return (
    <>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </>
  )
}
