import React from 'react'
import { ListItem } from 'material-ui/List';
import {  lightBlack } from 'material-ui/styles/colors';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Moment from 'react-moment';
import LikeComponent from '../common/LikeComponent'
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ContentSave from 'material-ui/svg-icons/content/save';
import ActionDelete from 'material-ui/svg-icons/action/delete';
const CommentCard = (props) => {
    let {editItem,item, onLikeComment,onEditClick,editMode,updateField,onUpdateComment,onDeleteClick} = props;
    let style={icon:  {width: 16,height: 16},small:{ width: 34, height: 34,padding: 16}};
    
    return <div>{editMode? <ListItem key={editItem.id} style={{ height: 140 }}
      secondaryText  ={<span> 
          <IconButton onClick={onUpdateComment}> <ContentSave color={lightBlack} /></IconButton>
        <IconButton iconStyle={style.icon} style={style.small} onClick={onEditClick}> 
            <NavigationClose color={lightBlack}></NavigationClose></IconButton></span>}
        primaryText={
            <span>
                <TextField  floatingLabelText="Your name"
      floatingLabelFixed={true} value={editItem.author} style={{ marginRight: 15 }} onChange={(e) => updateField('author', e.target.value)}
            /> 
                 <TextField  floatingLabelText="Comment" 
      floatingLabelFixed={true} onChange={(e) => updateField('body', e.target.value)}
       multiline="true"         value={editItem.body}
           
            ></TextField>
            </span>
        }
      
    ></ListItem>:
    <ListItem style={{ height: 90 }} key={item.id}
        primaryText={<span><Moment format="D MMM YY, HH:mm A">{item.timestamp}</Moment> 
        <IconButton iconStyle={style.icon} style={style.small} onClick={onEditClick}> 
            <EditorModeEdit color={lightBlack}></EditorModeEdit></IconButton>
              <IconButton iconStyle={style.icon} style={style.small} onClick={onDeleteClick}> 
            <ActionDelete color={lightBlack}></ActionDelete></IconButton>
            </span>}
        secondaryText={
            <p style={{ width: 400 }}>
                {item.author} said --  {item.body}
            </p>
        }
        secondaryTextLines={2}
    >
        <div style={{ position: 'absolute', verticalAlign: 'top', marginLeft: '400px' }}>
            <LikeComponent item={item} onLike={onLikeComment} showCommentIcon={false}></LikeComponent>
        </div>

    </ListItem>}</div>
}
export default CommentCard