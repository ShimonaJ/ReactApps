import React from 'react'
import { Link } from 'react-router-dom'
const Header = (props) => {
 return  <header className="mdl-layout__header">
            <div className="mdl-layout__header-row">
                <span className="mdl-layout-title">  <Link style={{'color':'#fffcfd'}}  to='/'>My Reads</Link></span>
                <div className="mdl-layout-spacer"></div>
            </div>
        </header>
}
export default Header