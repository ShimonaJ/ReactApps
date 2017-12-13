import React from 'react'
import { Link } from 'react-router-dom'
import Header from './common/Header'
const NoMatch = (props) => {
    return <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
       <Header></Header>
           <main className="mdl-layout__content">
            <div className="nomatch-content">
                <div className="mdl-cell--middle">
             
  <p><b>404.</b> <ins>That’s an error.</ins>
  </p><p>The requested URL  was not found on this server.<br/><br/>  
      <Link to='/'>Click to visit My Reads Home Page</Link>
</p>
            </div>         </div>
            </main>
        </div>

}
export default NoMatch