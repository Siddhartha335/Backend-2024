const { Transaction } = require("./transaction.js");

class Library {
    constructor() {
        this.books = [];
        this.users = [];
        this.transactions = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    registerUser(user) {
        this.users.push(user);
    }

    borrowBook(userId, bookId) {
        const user = this.getUser(userId);
        const book = this.getBook(bookId);

        if (book && book.availableCopies > 0 && user) {
            const borrowDate = new Date();
            const dueDate = new Date(borrowDate);
            dueDate.setDate(borrowDate.getDate() + 14); // 2 weeks due

            this.transactions.push(new Transaction(bookId, userId, borrowDate, dueDate));
            book.availableCopies--;
            user.borrowedBooks.push(bookId);
            console.log(`User ${user.name} borrowed "${book.title}".`);
        } else {
            console.log('Book is not available or user does not exist.');
        }
    }

    returnBook(userId, bookId) {
        const transaction = this.getTransaction(userId, bookId);

        if (transaction) {
            transaction.returned = true;
            const book = this.getBook(bookId);
            book.availableCopies++;
            const user = this.getUser(userId);
            user.borrowedBooks = user.borrowedBooks.filter(id => id !== bookId);
            console.log(`User ${user.name} returned "${book.title}".`);
        } else {
            console.log('Transaction not found or book already returned.');
        }
    }

    checkOverdueBooks() {
        const today = new Date();
        const overdueTransactions = this.transactions.filter(t => !t.returned && t.dueDate < today);

        overdueTransactions.forEach(t => {
            const user = this.getUser(t.userId);
            console.log(`User ${user.name} has an overdue book with ID ${t.bookId}.`);
        });
    }

    reportLostBook(userId, bookId) {
        const transaction = this.getTransaction(userId, bookId);

        if (transaction) {
            transaction.returned = true; // Mark as returned
            console.log(`User ${userId} reported book ${bookId} as lost.`);
        } else {
            console.log('Transaction not found or book already returned.');
        }
    }

    getUser(userId) {
        return this.users.find(u => u.id === userId);
    }

    getBook(bookId) {
        return this.books.find(b => b.id === bookId);
    }

    getTransaction(userId, bookId) {
        return this.transactions.find(t => t.userId === userId && t.bookId === bookId && !t.returned);
    }

    getBookDetails(bookId) {
        const book = this.getBook(bookId);
        if (book) {
            console.log(`Book ID: ${book.id}, Title: "${book.title}", Author: ${book.author}, Available Copies: ${book.availableCopies}`);
        } else {
            console.log('Book not found.');
        }
    }
}

module.exports = { Library };
