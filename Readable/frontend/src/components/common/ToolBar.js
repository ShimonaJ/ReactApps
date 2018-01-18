import React,{Component} from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import {Toolbar, ToolbarGroup,  ToolbarTitle} from 'material-ui/Toolbar';
import ActionReorder  from 'material-ui/svg-icons/action/reorder';
import { Link } from 'react-router-dom'
export default class TopToolbar extends Component {

  state = {
  
   openMenu:false
  };

 handleChangeSingle = (event, value) => {
     this.props.onSortChange(value);
 
  };

  handleOnRequestChange = (value) => {
     
    this.setState({
      openMenu: value,
    });
  }

  render() {
      const {title,showBack,sortByValue} = this.props;
    return (
      <Toolbar>
        <ToolbarGroup>
           <ToolbarTitle text= {title} />
            </ToolbarGroup> 
             {showBack? <ToolbarGroup>
            
             <Link  to="/">Back</Link></ToolbarGroup>:
           <ToolbarGroup>
            <label >Sort By: {sortByValue}</label>
            
           <IconMenu style={{targetOrigin: {"horizontal":"left","vertical":"top"}}}
          iconButtonElement={<IconButton><ActionReorder /></IconButton>}
          open={this.state.openMenu}  value={sortByValue}
          onChange={this.handleChangeSingle} 
          onRequestChange={this.handleOnRequestChange}>
    
          <MenuItem value="timestamp" primaryText="Timestamp" />
          <MenuItem value="votescore" primaryText="Vote Score" />
        
        </IconMenu>
        </ToolbarGroup>}
      </Toolbar>
    );
  }
}