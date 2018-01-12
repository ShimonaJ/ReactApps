import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import CommentForm from './CommentForm'
import CommentCard from './CommentCard'
import { DummyComment } from '../../utils/constants'
import uuidv1 from 'uuid/v1'
import { voteOnComment, addComment, updateComment ,deleteComment} from '../../actions/comment'
class Comments extends Component {
  state = {
    actionMode: '', //'','edit'
    editItem: DummyComment
  };
  onLikeComment = (op, val) => {
    this.props.voteOnComment(op, val);
  }
  onUpdate = () => {

    let obj = this.state.editItem;
    obj.timestamp = Date.now();
    this.props.updateComment(this.props.post, obj);
    this.setState(prevState => ({
      editItem: DummyComment,
      actionMode: prevState.actionMode === 'edit' ? '' : 'edit'

    }));
  }
  onAdd = () => {

    let obj = this.state.editItem;
    obj.id = uuidv1();
    obj.timestamp = Date.now();
    this.props.addComment(this.props.post, obj);
    this.setState(prevState => ({
      editItem: DummyComment,
      actionMode: ''

    }));
  }
  onEditClose = () => {
    this.setState(prevState => ({
      actionMode: '',
      editItem: DummyComment
    }));
  }


  updateField = (key, val) => {
    this.setState({
      editItem: {
        ...this.state.editItem,
        [key]: val
      }
    });
  }
  onEdit = (item) => {
    this.setState(prevState => ({
      editItem: Object.assign({}, item),
      actionMode: prevState.actionMode === 'edit' ? '' : 'edit'

    }));
  }

onDelete = (item) => {
   this.props.deleteComment(item);
  }

  render() {
    let {comments} = this.props;


    return <List >
      <Subheader>Comments
    {this.state.actionMode!=='edit'? <CommentForm editItem={this.state.editItem} updateField={this.updateField}
          onUpdate={this.onAdd}></CommentForm>:''}
      </Subheader>
      { comments!==undefined ? comments.map((item) =>
        <CommentCard key={item.id} onUpdateComment={this.onUpdate} editMode={this.state.actionMode==='edit' && this.state.editItem.id === item.id} 
        updateField={this.updateField} onDeleteClick={()=>this.onDelete(item)} 
        onEditClick={()=>this.onEdit(item)} editItem={this.state.editItem} item={item} onLikeComment={this.onLikeComment}></CommentCard>
      ):'' }
    </List>
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addComment: (post, data) => dispatch(addComment(post, data)),
    updateComment: (post, data) => dispatch(updateComment(post, data)),
    deleteComment: ( data) => dispatch(deleteComment( data)),
    voteOnComment: (item, val) => dispatch(voteOnComment(item, val))
  }
}

export default connect(
  state => state,
  mapDispatchToProps
)(Comments)
