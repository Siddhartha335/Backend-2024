const {Library} = require("./library.js")
const {Book} = require("./book.js")
const {User} = require("./user.js")


const library = new Library();
library.addBook(new Book(1, "1984", "George Orwell", 1949, "1234567890", 3));
library.registerUser(new User(1, "Alice", "alice@example.com"));

library.borrowBook(1, 1); // Alice borrows 1984
library.getBookDetails(1); // Show details of 1984
library.checkOverdueBooks(); // Check for overdue books
library.returnBook(1, 1); // Alice returns 1984
library.getBookDetails(1); // Show details of 1984 again
library.getTransaction(1,1);
// library.reportLostBook(1, 1); // Alice reports 1984 as lost

