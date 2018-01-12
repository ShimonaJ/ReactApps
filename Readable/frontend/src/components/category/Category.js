import React from 'react'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import { Link } from 'react-router-dom'
import muiThemeable from 'material-ui/styles/muiThemeable';
const Category = (props) =>{
    let {categories,selectedCategory,OnCategorySelect} = props;
   
    return <Drawer width={250} containerStyle={    {margin: '80px 20px 20px 20px',
    padding: '25px',height:'450px'}} open={true}>
        <Subheader >Categories </Subheader>
        {categories[0]!==undefined?
     Object.values(categories[0]).map((item)=>
    
    <MenuItem  key={item.name} onClick={(e)=>OnCategorySelect(e,item.name)}  >
        <Link  style={{color:selectedCategory===item.name?props.muiTheme.palette.accent1Color:props.muiTheme.palette.textColor}}  to="/">{item.name}</Link>
     </MenuItem>):''}
     </Drawer>
}
export default muiThemeable()(Category);