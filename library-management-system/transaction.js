class Transaction {
    constructor(bookId, userId, borrowDate, dueDate, returned = false) {
        this.bookId = bookId; // ID of the borrowed book
        this.userId = userId; // ID of the user who borrowed the book
        this.borrowDate = borrowDate; // Date when the book was borrowed
        this.dueDate = dueDate; // Date when the book is due
        this.returned = returned; // Flag to check if the book is returned
    }
}

module.exports = {
    Transaction
}