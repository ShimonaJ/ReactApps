import React, { Component } from 'react'
import { connect } from 'react-redux'
import TopToolbar from '../common/ToolBar'
import Chip from 'material-ui/Chip';
import uuidv1 from 'uuid/v1'
import {  vote, updatePost, addPost,deletePost } from '../../actions/index'
import PostForm from './PostForm'
import PostCard from './PostCard'
import {DummyPost} from '../../utils/constants'

 class Post extends Component {

    state = {
        actionMode: '', //'','edit','add'
        editItem: DummyPost
    };

    onUpdate = () => {
        let obj = this.state.editItem;
        obj.timestamp = Date.now();
        this.props.onUpdatePost(obj);
        this.setState(prevState => ({
            editItem: DummyPost,
            actionMode: prevState.actionMode==='edit'?'':'edit'

        }));
    }
    onAdd = () => {
       
        let obj = this.state.editItem;
        obj.id = uuidv1();
        obj.timestamp = Date.now();
        this.props.onAddPost(obj);
        this.setState(prevState => ({
            editItem: DummyPost,
            actionMode: ''

        }));
         this.props.onAdd();
    }
    onEditClose = () => {
        this.setState(prevState => ({
            actionMode: '',
            editItem: DummyPost
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
            actionMode: prevState.actionMode==='edit'?'':'edit'

        }));
    }
  
    componentDidMount() {
       
        if(this.props.addMode){
             this.setState({
                 actionMode:'add',
                 editItem:DummyPost
             });
        }
        if(this.props.isDetailPage && this.props.item!==undefined){
            this.props.fetchComments(this.props.item);
        }
        
    }
    getToolbarTitle = (actionMode)=>{
       
        switch(actionMode){
            case 'add':return 'Add Post';
            case 'edit':return 'Update Selected Post';
            case '':return 'Post Details';

        }
    }
   onLike = (op, val) => {
    this.props.vote(op, val);
  }
 
  onDelete= (params) => {
    this.props.onDeletePost(params)
    this.props.onDelete();
  }
 
    render() {
        let {item, isDetailPage,  addMode,fetchComments} = this.props;
debugger;
        let detailPageStyle = isDetailPage ? { marginLeft: '280px', padding: '80px 20px 20px 10px' } : {};
        const styles = {
            card: { width: '100%', marginTop: 20, padding: '20px 40px 20px 20px' }
           
        };
        return (<div style={detailPageStyle}>
            <Chip
                style={{ borderRadius: '0px', marginLeft: '0px', position: 'absolute', marginTop: isDetailPage ? '75px' : '0px' }}
            >
            {item?item.category:''}
            </Chip>
            {isDetailPage ? 
            <TopToolbar showBack={true} title={this.state.actionMode==='add'?'Add New Post':'Selected Post Details'}></TopToolbar> : ''}
           
            {this.state.actionMode==='edit' ?
                <PostForm styleData={styles}  editItem={this.state.editItem} onEditClose={this.onEditClose} onUpdate={this.onUpdate} updateField={this.updateField}></PostForm> :
             this.state.actionMode==='add' || addMode ?
                <PostForm styleData={styles}  editItem={this.state.editItem}  onUpdate={this.onAdd} updateField={this.updateField}></PostForm> 
                :
                <PostCard fetchComments={fetchComments} styleData={styles} item={item} onLike={this.onLike} onDelete={this.onDelete} onEdit={this.onEdit}
                    isDetailPage={isDetailPage}></PostCard>

            }
        </div>)
    }
}
function mapDispatchToProps(dispatch) {
  return {
    onUpdatePost: (data) => dispatch(updatePost(data)),
    onAddPost: (data) => dispatch(addPost(data)),
    vote: (item, val) => dispatch(vote(item, val)),
    onDeletePost: (item) => dispatch(deletePost(item))
  }
}

export default connect(
  state => state,
  mapDispatchToProps
)(Post)
