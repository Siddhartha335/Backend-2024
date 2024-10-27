class Book {
    constructor(id, title, author, publishedYear, isbn, availableCopies) {
        this.id = id; // Unique identifier for the book
        this.title = title; // Title of the book
        this.author = author; // Author of the book
        this.publishedYear = publishedYear; // Year the book was published
        this.isbn = isbn; // ISBN number
        this.availableCopies = availableCopies; // Number of copies available
        this.totalCopies = 0; // Total number of copies
    }
}
module.exports = {
    Book
}