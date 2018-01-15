import React from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import ContentSave from 'material-ui/svg-icons/content/save';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import CommunicationForum from 'material-ui/svg-icons/communication/forum';
import SelectField from 'material-ui/SelectField';
import { lightBlack } from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import { Card,  CardHeader,  CardTitle, CardText } from 'material-ui/Card';
import {
    categories

} from '../../orm/selectors';
const PostForm = (props) => {
    let {categories, editItem, updateField, onEditClose, onUpdate, styleData} = props;

    return <Card style={styleData.card} >
        <CardHeader
            avatar={<Avatar icon={<CommunicationForum />} />}

            title={<div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <TextField maxLength={60}
                    floatingLabelText="Author Name"
                    floatingLabelFixed={true}
                    onChange={(e) => updateField('author', e.target.value)}
                    value={editItem.author}

                />
                <span style={{ width: '15px' }} />
                <SelectField value={editItem.category}
                    floatingLabelText="Category" onChange={(e, index, value) => updateField('category', value)}
                    floatingLabelFixed={true}>

                    {categories !== undefined && Object.values(categories).map((op,index) => <MenuItem key={index} value={op.name} primaryText={op.name}></MenuItem>)}
                </SelectField></div>}>
            <Paper style={{ float: 'right' }} zDepth={0}><IconButton onClick={() => onUpdate(editItem)}> <ContentSave color={lightBlack} /></IconButton>
                <IconButton> <NavigationClose onClick={() => onEditClose()} color={lightBlack} /></IconButton></Paper>
        </CardHeader>
        <Divider></Divider>
        <CardTitle title={<TextField fullWidth={true}
            onChange={(e) => updateField('title', e.target.value)}
            floatingLabelText="Title" maxLength={120}
            floatingLabelFixed={true}
            value={editItem.title} />} />
        <CardText><TextField fullWidth={true} floatingLabelText="Post Details" maxLength={300}
            onChange={(e) => updateField('body', e.target.value)}
            floatingLabelFixed={true} value={editItem.body} multiLine={true}
        ></TextField></CardText>
    </Card>
}
function mapStateToProps(state) {

    return {
        categories: categories(state)
    }
}
export default connect(
    mapStateToProps
)(PostForm)
