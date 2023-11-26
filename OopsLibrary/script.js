class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.available = true;
  }
}
class LibraryMember {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.borrowedBooks = [];
  }
  borrowBook(book) {
    if (book.available) {
      book.available = false;
      this.borrowedBooks.push(book);
      return `${this.name} has successfully borrowed '${book.title}' by ${book.author}.`;
    } else {
      return `Sorry, '${book.title}' is currently unavailable.`;
    }
  }
  returnBook(book) {
    if (this.borrowedBooks.includes(book)) {
      book.available = true;
      this.borrowedBooks = this.borrowedBooks.filter((b) => b !== book);
      return `${this.name} has successfully returned '${book.title}' by ${book.author}.`;
    } else {
      return `You didn't borrow '${book.title}' from the library.`;
    }
  }
  displayBorrowedBooks() {
    if (this.borrowedBooks.length === 0) {
      return `${this.name} has not borrowed any books.`;
    } else {
      const bookList = this.borrowedBooks.map((book) => book.title).join(", ");
      return `${this.name} has borrowed the following books: ${bookList}.`;
    }
  }
}
class LibraryStaff {
  static addBook(library, title, author) {
    const newBook = new Book(title, author);
    library.push(newBook);
    return `Added '${title}' by ${author} to the library.`;
  }
  static removeDamagedBook(library, book) {
    const index = library.indexOf(book);
    if (index !== -1) {
      library.splice(index, 1);
      return `Removed '${book.title}' by ${book.author}`;
    } else {
      return "The specified book is not in the library.";
    }
  }
}
// Example usage:
// Create library staff member
const librarian = new LibraryStaff();
// Create library with some books
const library = [
  new Book("The color Purple", "Alice Walker"),
  new Book("To Kill a Mockingbird", "Harper Lee"),
  new Book("1984", "George Orwell"),
];
// Create library member
const member = new LibraryMember("Manasa", "manasa@email.com");
// Library staff adds a new book
console.log(
  LibraryStaff.addBook(library, "The Great Gatsby", "F. Scott Fitzgerald")
);
// Library member borrows a book
console.log(member.borrowBook(library[0]));
// Library member returns a book
console.log(member.returnBook(library[0]));
// Library member displays borrowed books
console.log(member.displayBorrowedBooks());
// Library staff removes a damaged book
console.log(LibraryStaff.removeDamagedBook(library, library[1]));
