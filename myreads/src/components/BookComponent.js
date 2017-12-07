import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookList from './BookList'
import PropTypes from 'prop-types'
import Loader from 'react-loader';
import options from '../const'
class BookComponent extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        handleShelfChange: PropTypes.func.isRequired,
        isFetching: PropTypes.bool.isRequired,
    }
    render() {
        let {books, handleShelfChange, isFetching} = this.props;

        let currentlyReading = books.filter((item) => item.shelf === "currentlyReading");
        let read = books.filter((item) => item.shelf === "read");
        let wantToRead = books.filter((item) => item.shelf === "wantToRead");
        debugger;
        return  <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
  <header className="mdl-layout__header">
    <div className="mdl-layout__header-row">
      
      <span className="mdl-layout-title">My Reads</span>
    
      <div className="mdl-layout-spacer"></div>
      
      </div>
  </header>
  <main className="mdl-layout__content">
    <div className="page-content">
        <div className="list-books">
         
           
             {isFetching?<Loader loaded={!isFetching} options={options} className="spinner overlay" />:<div>
            <BookList handleShelfChange={handleShelfChange} title="Currently Reading" books={currentlyReading} />
            <BookList handleShelfChange={handleShelfChange} title="Read" books={read} />
            <BookList handleShelfChange={handleShelfChange} title="Want to read"  books={wantToRead} />
            </div>}
            <div className="open-search">
                <Link to='/search'>Add a book</Link>
            </div>
        </div>
</div>
  </main>
</div>
    }
}
export default BookComponent