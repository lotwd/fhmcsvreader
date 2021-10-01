import React, {useEffect} from "react"
import { navigate } from 'gatsby'
import LeaguePage from '../components/leaguePage/leaguePage'

const League = ({location}) => {
  const data = location && location.state ? location.state.data : null
  const id = data?.[0]
  const name = data?.[1]
  const abbr = data?.[2]
  useEffect(()=>{
    if(!data){
      navigate('/');
    }
  },[data])
  if(!data)return <div>There is no leagues data loaded, redirecting home...</div>
  return (
    <main>
        <LeaguePage id={id} name={name} abbr={abbr}/>
    </main>
  )
}

export default League
