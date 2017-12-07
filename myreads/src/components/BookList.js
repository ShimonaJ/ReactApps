import React,{Component} from 'react'
import BookListItem from './BookListItem'
import PropTypes from 'prop-types'
class BookList extends Component{
static propTypes = {
    books: PropTypes.array.isRequired,
    handleShelfChange: PropTypes.func.isRequired,
    title:PropTypes.string.isRequired
  }

    render(){
        let {books,title,handleShelfChange} = this.props;
        console.log(books.length);
        return <div className="container  list-books-content">
              
                <div className="bookshelf">
                <div className="panel-title">  <h3 className="bookshelf-title">{title}</h3></div>
                  <div className="panel-content bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) => (
                             <BookListItem  key={book.id} book={book} handleShelfChange={handleShelfChange}/>
                      ))}
                    </ol>
                  </div>
                </div>
               
              
            </div>
            
         
    }
}
export default BookList