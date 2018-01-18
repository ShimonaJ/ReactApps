import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/index'
// import { fetchComments } from '../actions/comment'
import { muiStyle } from '../utils/constants'
import Category from '../components/category/Category'
import { Posts } from '../components/post/Posts'
import Post from '../components/post/Post';
import { NoMatch } from '../components/common/NoMatch';
import { Link } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Redirect } from 'react-router'
import {
  posts,
  categories

} from '../orm/selectors';
class App extends Component {
  componentWillMount() {
    this.props.fetchCategories();
    this.props.fetchPosts();
  }
  fetchComments = (item) => {
    this.props.fetchComments(item)
  }
  onCategorySelect = (e, name) => {
    this.props.selectCategory(this.props.selectedCategory === name.trim() ? '' : name)
    if (e != null)
    { e.preventDefault(); }
  }
  onSortChange = (sortBy) => {
    this.props.selectSortBy(sortBy)
  }
  checkCategory = (cat) => {
    if (cat === "/all") {
      return true;
    }
    if (this.props.categories != undefined) {

      var s = Object.values(this.props.categories).filter((item) => "/" + item.name === cat);
      return s.length > 0;
    }
    return false;
  }
  render() {
    const muiTheme = getMuiTheme(muiStyle);
    const {categories, posts, selectedCategory, sortBy} = this.props;
    return <Router>
      <MuiThemeProvider muiTheme={muiTheme}>
        <div> <AppBar style={{ position: 'fixed' }} title={<Link style={{ color: "#fff" }} onClick={(e) => { this.onCategorySelect(null, "") }} to="/all">Chit Chat</Link>} showMenuIconButton={false} />

          <Category selectedCategory={selectedCategory} OnCategorySelect={this.onCategorySelect} categories={categories}></Category>
          <Switch>

            <Route exact path='/:category' render={({match, history}) => (
              <div>  {this.checkCategory(match.url) && posts !== undefined ?
                <Posts sortBy={sortBy} onSortChange={this.onSortChange} fetchComments={this.fetchComments}
                  onDelete={() => { history.push("/all") }} posts={posts}></Posts>
                :
                match.url === '/newpost' ? <Post isDetailPage={true} onAdd={(item) => { history.push("/all") }} addMode={true}  ></Post> : <NoMatch></NoMatch>} </div>

            )} />

            <Redirect exact from="/" to="/all" />

            <Route exact path='/post/:category/:id' render={({match, history}) => (
              <div>
                {posts !== undefined && posts.filter((op) => op.id === match.params.id).length > 0 ?

                  <Post fetchComments={this.fetchComments} isDetailPage={true} item={posts.filter((op) => op.id === match.params.id)[0]}
                    onDelete={() => { history.push("/all") }} >

                  </Post>
                  : <NoMatch></NoMatch>}
              </div>
            )} />
            <Route component={NoMatch} />
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

// function mapDispatchToProps(dispatch) {
//   return {
//     fetchPosts: (data) => dispatch(fetchPosts(data)),
//     fetchCategories: () => dispatch(fetchCategories()),
//     selectCategory: (name) => dispatch(selectCategory(name)),
//     selectSortBy: (name) => dispatch(selectSortBy(name)),
//     fetchComments: (data) => dispatch(fetchComments(data)),
//   }
// }

export default connect(
  mapStateToProps,
  actions
)(App)