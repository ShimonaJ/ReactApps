import React from 'react'
import * as BooksAPI from './BooksAPI'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import BookComponent from './components/BookComponent'
import Search from './components/Search'


class BooksApp extends React.Component {
  state = {
    books: [],
    isFetching:false
  }
  
  componentDidMount() {
   
    this.findAllBooks();
  }
  doLoader(show){
      this.setState({ isFetching:show })
  }
  findAllBooks=()=>{
    this.doLoader(true);
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
      this.doLoader(false);
    })
  }
  handleShelfChange=(book,value)=>{
      this.doLoader(true);
    BooksAPI.update(book,value).then((response) => {
      this.findAllBooks();
      this.doLoader(false);
    })
  }
  handleSearchChange = (searchText) =>{
     this.doLoader(true);
   var searchTerm = searchText.trim()
    BooksAPI.search(searchText).then((books) => {
    
      if(books.error){
        this.setState({books:[] });
      }else{
       this.setState({books });
      }
       this.doLoader(false);
    })
  }
  render() {
    return (
      <Router>
        <div className="app">
         
          <Route path='/search' render={({history}) => (
            <Search isFetching={this.state.isFetching}  handleShelfChange={this.handleShelfChange}  books={this.state.books} handleSearchChange={this.handleSearchChange} />
          )} />
          <Route exact path='/' render={() => (
            
             <BookComponent isFetching={this.state.isFetching} handleShelfChange={this.handleShelfChange} books={this.state.books} />
             
          )} />
              
         
        </div>
      </Router>
    )
  }
}

export default BooksApp
