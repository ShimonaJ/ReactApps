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
    isFetching:PropTypes.bool.isRequired,
  }
    render() {
        let {books, handleShelfChange,isFetching} = this.props;

        let currentlyReading = books.filter((item) => item.shelf === "currentlyReading");
        let read = books.filter((item) => item.shelf === "read");
        let wantToRead = books.filter((item) => item.shelf === "wantToRead");

        return <div className="list-books">
            <div className="list-books-title"><h1>MyReads</h1></div>
             {isFetching?<Loader loaded={!isFetching} options={options} className="spinner overlay" />:<div>
            <BookList handleShelfChange={handleShelfChange} title="Currently Reading" books={currentlyReading} />
            <BookList handleShelfChange={handleShelfChange} title="Read" books={read} />
            <BookList handleShelfChange={handleShelfChange} title="Want to read"  books={wantToRead} />
            </div>}
            <div className="open-search">
                <Link to='/search'>Add a book</Link>
            </div>
        </div>
    }
}
export default BookComponent