import React, { Component } from 'react'
import { connect } from 'react-redux'
import TopToolbar from '../common/ToolBar'
import Chip from 'material-ui/Chip';
import uuidv1 from 'uuid/v1'
import * as action from '../../actions/index'
import PostForm from './PostForm'
import PostCard from './PostCard'
import { DummyPost } from '../../utils/constants'

class Post extends Component {

    state = {
        actionMode: '', //'','edit','add'
        editItem: DummyPost
    };

    onUpdate = () => {
        let obj = this.state.editItem;
        obj.timestamp = Date.now();
        this.props.updatePost(obj);
        this.setState(prevState => ({
            editItem: DummyPost,
            actionMode: prevState.actionMode === 'edit' ? '' : 'edit'

        }));
    }
    onAdd = () => {

        let obj = this.state.editItem;
        obj.id = uuidv1();
        obj.timestamp = Date.now();
        this.props.addPost(obj);
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
            actionMode: prevState.actionMode === 'edit' ? '' : 'edit'

        }));
    }

    componentDidMount() {

        if (this.props.addMode) {
            this.setState({
                actionMode: 'add',
                editItem: DummyPost
            });
        }
        if (this.props.isDetailPage && this.props.item !== undefined) {
            this.props.fetchComments(this.props.item);
        }

    }
    getToolbarTitle = (actionMode) => {

        switch (actionMode) {
            case 'add': return 'Add Post';
            case 'edit': return 'Update Selected Post';
            case '': return 'Post Details';

        }
    }
    onLike = (op, val) => {
        this.props.vote(op, val);
    }

    onDelete = (params) => {
        this.props.deletePost(params)
        this.props.onDelete();
    }
    getCategoryComponent = () => {
        let category = this.props.item ? this.props.item.category : ''
        return (<Chip style={{ borderRadius: '0px', marginLeft: '0px', position: 'absolute', marginTop: this.props.isDetailPage ? '75px' : '0px' }}>
            {category}
        </Chip>)
    }
    getPostComponent = () => {
        const styles = {
            card: { width: '100%', marginTop: 20, padding: '20px 40px 20px 20px' }

        };
        if (this.state.actionMode === 'edit') {
            return <PostForm styleData={styles} editItem={this.state.editItem} onEditClose={this.onEditClose} onUpdate={this.onUpdate} updateField={this.updateField}></PostForm>;
        } else if (this.state.actionMode === 'add' || this.props.addMode) {
            return <PostForm styleData={styles} editItem={this.state.editItem} onUpdate={this.onAdd} updateField={this.updateField}></PostForm>
        } else {
            return <PostCard fetchComments={this.props.fetchComments} styleData={styles} item={this.props.item} onLike={this.onLike} onDelete={this.onDelete} onEdit={this.onEdit}
                isDetailPage={this.props.isDetailPage}></PostCard>
        }


    }
    render() {
        let { isDetailPage} = this.props;
        let detailPageStyle = isDetailPage ? { marginLeft: '280px', padding: '80px 20px 20px 10px' } : {};

        return (<div style={detailPageStyle}>
            {this.getCategoryComponent()}

            {isDetailPage ?
                <TopToolbar showBack={true} title={this.state.actionMode === 'add' ? 'Add New Post' : 'Selected Post Details'}></TopToolbar> : ''}
            {this.getPostComponent()}

        </div>)
    }
}

export default connect(
    state => state,
    action
)(Post)
