class User {
    constructor(id, name, email) {
        this.id = id; // Unique identifier for the user
        this.name = name; // Name of the user
        this.email = email; // Email of the user
        this.borrowedBooks = []; // List of borrowed book IDs
    }
}

module.exports = {
    User
}