import React from 'react'
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
const CommentForm = (props) => {
    let { editItem, updateField,  onUpdate} = props;
    return <Paper style={{ marginBottom: 10, padding: 15, display: 'flex', flexWrap: 'wrap' }}>
        <TextField value={editItem.author} style={{ marginRight: 15 }} onChange={(e) => updateField('author', e.target.value)}
            hintText="Your name" />  <TextField style={{ marginRight: 15 }} hintText="Write comment here" onChange={(e) => updateField('body', e.target.value)}
                value={editItem.body}
                multiLine={true}
            ></TextField>
        
        <FlatButton onClick={onUpdate} label="Submit" primary={true}  />
        </Paper>
}
export default CommentForm
