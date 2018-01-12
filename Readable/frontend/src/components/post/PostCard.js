import React, { Component } from 'react'

import Paper from 'material-ui/Paper';
import Moment from 'react-moment';

import Comments from '../comment/Comments'
import LikeComponent from '../common/LikeComponent'

import { Link } from 'react-router-dom'
import Avatar from 'material-ui/Avatar';


import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import CommunicationForum from 'material-ui/svg-icons/communication/forum';


import { lightBlack } from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import { Card,  CardHeader,  CardTitle, CardText } from 'material-ui/Card';

class PostCard extends Component {
    state = {
       // showActionItems: false,
        showComments:false
        
    }
    
    // onLike = (op, val) => {
    //     this.props.onLike(op, val);
    //     this.setState({
    //         showActionItems: false,
    //     });
    // }
    // onHover = (e) => {

    //     if (!this.state.showActionItems) {
    //         this.setState({
    //             showActionItems: true
    //         });
    //     }

    // }
    fetchComments= (item) => {
        this.props.fetchComments(item);
        this.setState(prevState => ({
            showComments: !prevState.showComments
        }));
    }
    
    render() {
        let {item, onDelete,  onEdit, isDetailPage, styleData,onLike} = this.props;

        return <div>{item!==undefined? <Card style={styleData.card} >
           <CardHeader
                title={item.author}
                subtitle={<Moment format="D MMM YY, HH:mm A">{item.timestamp}</Moment>}
                avatar={<Avatar icon={<CommunicationForum />} />}
            >
                <Paper style={{ float: 'right' }} zDepth={0}><IconButton onClick={() => onDelete(item)}> <ActionDelete color={lightBlack}></ActionDelete></IconButton>
                    <IconButton> <EditorModeEdit onClick={() => onEdit(item)} color={lightBlack}></EditorModeEdit></IconButton></Paper>

            </CardHeader>

            <Divider></Divider>
            {isDetailPage ? <CardTitle title={item.title} />
                :
                <Link to={'/post/' + item.category+'/'+item.id}>   <CardTitle title={item.title} /></Link>}
            <CardText> {item.body}</CardText>
            <LikeComponent item={item} onLike={onLike} fetchComments={this.fetchComments} showCommentIcon={true}></LikeComponent>
          
            {isDetailPage || this.state.showComments ?
            <div> <Divider /> <Comments  post={item}  styleData={styleData}  comments={item.comments}></Comments></div> : ''}

        </Card>:''}</div>
    }
}
export default PostCard