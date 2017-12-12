import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BookListItem from './BookListItem'
import Loader from 'react-loader';
import { Debounce } from 'react-throttle';
import options from '../const'
const Search = (props) => {
    let {handleSearchChange,books,handleShelfChange,isFetching} = props;
       return  <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search" >Close</Link>
              <div className="search-books-input-wrapper">
                <Debounce time="400" handler="onChange">
                 <input onChange={(e) =>handleSearchChange(e.target.value) } type="text" placeholder="Search by title or author"/>
                </Debounce>
              </div>
            </div>
            {isFetching?<Loader loaded={!isFetching} options={options} className="spinner overlay" />:
            <div className="search-books-results">
              <ol className="books-grid">
                   {books?books.map((book) => (
                        <BookListItem key={book.id} book={book}  handleShelfChange={handleShelfChange}/>
                 )):''}
              </ol>
            </div>
            }
          </div>

}
Search.propTypes = {
    books: PropTypes.array.isRequired,
    handleShelfChange: PropTypes.func.isRequired,
    handleSearchChange: PropTypes.func.isRequired,
    isFetching:PropTypes.bool.isRequired
  }
export default Search