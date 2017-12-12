import React from 'react'
import * as BooksAPI from './BooksAPI'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import BookComponent from './components/BookComponent'
import Search from './components/Search'


class BooksApp extends React.Component {
  state = {
    books: [],
    searchbooks: [],
    isFetching: false,
    searchText: ''
  }

  componentDidMount() {
    this.state = {
      books: [],
      searchbooks: [],
      isFetching: false,
      searchText: ''
    }
    this.findAllBooks();

  }
  doLoader(show) {
    if(this.state.isFetching !== show){
      this.setState({ isFetching: show })
    }
  }
  findAllBooks = () => {
    
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
      if (this.state.searchText !== '') { 
         this.handleSearchChange(this.state.searchText);
      }
     

    })
  }
  handleShelfChange = (book, value) => {
    if (this.state.searchText === '') { 
      this.doLoader(true);
    }
    BooksAPI.update(book, value).then((response) => {
      this.findAllBooks();
    if (this.state.searchText === '') { 
      this.doLoader(false);
    }
    })
  }
  handleSearchChange = (searchText) => {
    this.setState({ searchText: searchText });
    if (searchText.trim() === "") {
      this.setState({ searchbooks: [] });
    } else {

      this.doLoader(true);
      BooksAPI.search(searchText.trim()).then((books) => {
        let searchbooks = books.error ? [] : books;
        let found = [];
        searchbooks = searchbooks.map((item) => {
          found = this.state.books.filter((bookitem) => item.id === bookitem.id);
          item.shelf = found.length > 0 ? found[0].shelf : "none";
          return item;

        }
        );

        this.setState({ searchbooks });
        this.doLoader(false);
      });
    }
  }
  render() {
    return (
      <Router>
        <div className="app">

          <Route path='/search' render={({history}) => (
            <Search isFetching={this.state.isFetching} handleShelfChange={this.handleShelfChange} books={this.state.searchbooks} handleSearchChange={this.handleSearchChange} />
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
