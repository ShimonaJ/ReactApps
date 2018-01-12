import React,{Component} from 'react'
import CommunicationComment from 'material-ui/svg-icons/communication/comment';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ActionThumbDown from 'material-ui/svg-icons/action/thumb-down';
import { lightBlack } from 'material-ui/styles/colors';
import Chip from 'material-ui/Chip';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';

export default class LikeComponent extends Component{
    state = {
        showActionItems: false,
        showComments:false
    }
    onLike = (op, val) => {
        this.props.onLike(op, val);
        this.setState({
            showActionItems: false,
        });
    }
     onHover = (e) => {

        if (!this.state.showActionItems) {
            this.setState({
                showActionItems: true
            });
        }

    }
    render(){
        let {showCommentIcon,item,fetchComments} = this.props;
        let styleData={ chip: { margin: 4 },
            actionitems1: {
                display: 'flex', flexWrap: 'wrap', width: 200,
                marginLeft: 120, marginTop: -20
            },
            actionitems2: {
                display: 'flex', flexWrap: 'wrap', width: 200,
                marginLeft: 120
            }
        }
    return <div   onMouseLeave={() => {
                if (this.state.showActionItems) {
                    this.setState({
                        showActionItems: false
                    });
                }
            }}>

            
  {showCommentIcon?<IconButton onClick={() => fetchComments(item)} > <Badge
                    badgeContent={item.commentCount}
                    primary={true}>       <CommunicationComment color={lightBlack}/></Badge>
                </IconButton>:''}
                <IconButton onMouseOver={this.onHover} > <Badge
                    badgeContent={item.voteScore}
                    primary={true}>   {item.voteScore > 0 ? <ActionThumbUp color={lightBlack}/> : <ActionThumbDown color={lightBlack}/>}</Badge>
                </IconButton>
           
                {this.state.showActionItems ?
                    <Paper zDepth={4} style={styleData.actionitems1}>
                        <Chip style={styleData.chip} onClick={() => this.onLike(item, true)}>
                            <Avatar icon={<ActionThumbUp></ActionThumbUp>} />
                            Like
                        </Chip>
                        <Chip style={styleData.chip} onClick={() => this.onLike(item, false)}>
                            <Avatar icon={<ActionThumbDown></ActionThumbDown>} />
                            Dislike
                        </Chip>
                    </Paper> : ''}
            </div>
    }
}