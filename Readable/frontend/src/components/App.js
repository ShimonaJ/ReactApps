import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts, fetchCategories,   selectCategory, selectSortBy } from '../actions/index'
import { fetchComments } from '../actions/comment'
import {muiStyle} from '../utils/constants'
import Category from '../components/category/Category'
import {Posts} from '../components/post/Posts'
import Post from '../components/post/Post';
import { Link } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  posts,
  categories

} from '../orm/selectors';
class App extends Component {
  componentWillMount() {
    this.props.getCategories();
    this.props.getPosts();
  }
  fetchComments = (item) => {
    this.props.getComments(item)
 }
  onCategorySelect = (e, name) => {
    this.props.selectCategory(this.props.selectedCategory === name ? '' : name)
    if(e!=null)
{    e.preventDefault();}
  }
  onSortChange = (sortBy) => {
    this.props.selectSortBy(sortBy)
  }
  render() {
    const muiTheme = getMuiTheme(muiStyle);
    const {categories, posts, selectedCategory, sortBy} = this.props;
    return <Router>
      <MuiThemeProvider muiTheme={muiTheme}>
        <div> <AppBar style={{ position: 'fixed' }} title={<Link style={{color:"#fff"}} to="/">Chit Chat</Link>} showMenuIconButton={false} />

          <Category selectedCategory={selectedCategory} OnCategorySelect={this.onCategorySelect} categories={categories}></Category>
          <Switch>

            <Route exact path='/' render={({history}) => (
              <div>   {posts !== undefined ?
                <Posts sortBy={sortBy} onSortChange={this.onSortChange} fetchComments={this.fetchComments}
                  onDelete={() => { history.push("/") }} posts={posts}></Posts>
                : ''} </div>

            )} />
  <Route exact path='/:category' render={({match,history}) => (
           <div>
             {this.onCategorySelect(null,match.params.category)}
   {history.push("/")}
   </div>
            )} />

            <Route path='/post/:category/:id' render={({match, history}) => (
              <div>
                {posts !== undefined ?
                 <Post fetchComments={this.fetchComments} isDetailPage={true} item={posts.filter((op) => op.id === match.params.id)[0]}
                      onDelete={() => {

                        history.push("/")
                      }} >

                    </Post>
                  : ''}
              </div>
            )} />
            <Route path='/newpost' render={({history}) => (

              <Post isDetailPage={true} onAdd={(item) => {
               
                history.push("/")
              }} addMode={true}  ></Post>

            )} />
          </Switch>
          <FloatingActionButton href="/newpost" style={{ position: 'fixed', bottom: '40px', right: '60px' }}>
            <ContentAdd />
          </FloatingActionButton>
        </div>
      </MuiThemeProvider>
    </Router>

  }
}

function mapStateToProps(state) {
  return {
    posts: posts(state),
    categories: categories(state),
    selectedCategory: state.selectedCategory,
    sortBy: state.sortBy
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPosts: (data) => dispatch(fetchPosts(data)),
    getCategories: () => dispatch(fetchCategories()),
    selectCategory: (name) => dispatch(selectCategory(name)),
    selectSortBy: (name) => dispatch(selectSortBy(name)),
    getComments: (data) => dispatch(fetchComments(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)