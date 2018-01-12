import {
 brown900,orange500,brown300,brown50,orangeA400
} from  'material-ui/styles/colors';
export const DummyPost = {
    id:'',
    title:'',
    author:'',
    category:'',
    body:'',
    voteScore:0,
    deleted: false,
    commentCount: 0
}
export const DummyComment = {
     id: '',
    parentId: "",
    body: '',
    author: '',
    voteScore: 0,
    deleted: false,
    parentDeleted: false
}
export  const muiStyle = {
  palette: {
   primary1Color: orange500,
   secondary1Color:orange500 ,
   accent1Color:orangeA400 

  },
  a :{ color:brown900 }
  
  
}