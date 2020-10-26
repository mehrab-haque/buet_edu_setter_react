import Rreact from 'react'
import * as firebase from 'firebase'

const Home=props=>{

  const logout=()=>{
    firebase.auth().signOut()
  }

  return(
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Home
