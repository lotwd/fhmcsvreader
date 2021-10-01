import * as React from "react"
import { navigate } from "gatsby"

const NotFoundPage = () => {
  React.useEffect(()=>{
    navigate('/')
  },[])
  return (
    <main>
      Page not found, redirecting home
    </main>
  )
}

export default NotFoundPage
