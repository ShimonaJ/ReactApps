import React from 'react'
import PropTypes from 'prop-types'
const BookListItem = (props) => {

  let {book,handleShelfChange} = props;
  return <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div   className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url('+(book.imageLinks?book.imageLinks.thumbnail:'http://via.placeholder.com/128x193?text=No%20Cover')+')' }}></div>
                            <div className="book-shelf-changer">
                              <select  onChange={(e) =>handleShelfChange(book,e.target.value) } value={book.shelf}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors ? book.authors.join(', ') : ''}</div>
                        </div>
                      </li>
}
BookListItem.propTypes = {
    book: PropTypes.object.isRequired,
    handleShelfChange: PropTypes.func.isRequired
    
  }
export default BookListItem