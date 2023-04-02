import React from 'react'
import Header from '../header/header'
import Footer from '../footer/footer'

const mainlayout = ({children}) => {
  return (
    <>
      <Header />
        <main>
          {children}
        </main>
      <Footer />
    </>
  )
}

export default mainlayout