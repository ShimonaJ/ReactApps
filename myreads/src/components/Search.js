import React,{Component} from 'react'
import { Link } from 'react-router-dom'
import BookListItem from './BookListItem'
import Loader from 'react-loader';
import PropTypes from 'prop-types'
import options from '../const'
class Search extends Component{
   static propTypes = {
    books: PropTypes.array.isRequired,
    handleShelfChange: PropTypes.func.isRequired,
    handleSearchChange: PropTypes.func.isRequired,
    isFetching:PropTypes.bool.isRequired
  }
render(){
    const {handleSearchChange,books,handleShelfChange,isFetching} = this.props;
       return  <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search" >Close</Link>
              <div className="search-books-input-wrapper">
                <input onChange={(e) =>handleSearchChange(e.target.value) } type="text" placeholder="Search by title or author"/>

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
}
export default Search