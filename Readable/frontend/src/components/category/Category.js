import React from 'react'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import { Link } from 'react-router-dom'
import muiThemeable from 'material-ui/styles/muiThemeable';
import PropTypes from 'prop-types'
import NavigationClose from 'material-ui/svg-icons/navigation/close';
const Category = (props) =>{
    let {categories,selectedCategory,OnCategorySelect} = props;
   
    return <Drawer width={250} containerStyle={    {margin: '80px 20px 20px 20px',
    padding: '25px',height:'450px'}} open={true}>
        <Subheader >Categories </Subheader>
        {categories!==undefined?
     Object.values(categories).map((item,index)=>
 
    <MenuItem rightIcon={selectedCategory===item.name?<NavigationClose />:null}  key={index} onClick={(e)=>OnCategorySelect(e,item.name)}  >
        <Link  style={{color:selectedCategory===item.name?props.muiTheme.palette.accent1Color:props.muiTheme.palette.textColor}}  to={'/'+(selectedCategory===item.name?"all":item.name)}>{item.name}</Link>
     </MenuItem>):''}
     </Drawer>
}
Category.propTypes = {
        categories: PropTypes.object.isRequired,
        selectedCategory: PropTypes.string.isRequired,
        OnCategorySelect: PropTypes.func.isRequired,
}
export default muiThemeable()(Category);