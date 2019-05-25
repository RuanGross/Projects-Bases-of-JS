class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
        // Set a list
        const list = document.querySelector("#book-list");
        // Create tr element
        const row = document.createElement("tr");
        // Insert cols
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;
        list.appendChild(row);
    }

    showAlert(message, className) {
        // create div
        const div = document.createElement("div");
        // Add classes
        div.className = `alert ${className}`;
        // Add text
        div.appendChild(document.createTextNode(message));

        // Get parent
        const container = document.querySelector(".container"),
            // Get form
            form = document.querySelector(".book-form");
        // insert alert before form
        container.insertBefore(div, form);

        // Time Out after 3 seconds
        setTimeout(function() {
            document.querySelector(".alert").remove();
        }, 3000);
    }

    deleteBook(target) {
        if (target.className === "delete") {
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#isbn").value = "";
    }
}

// Local storage class
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem("books") === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem("books"));
        }
        return books;
    }

    static displayBooks() {
        const books = Store.getBooks();

        books.forEach(function(book) {
            const ui = new UI();

            // Add book to list
            ui.addBookToList(book);
        });
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);

        localStorage.setItem("books", JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach(function(book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem("books", JSON.stringify(books));
    }
}

// DOM load Event
document.addEventListener("DOMContentLoaded", Store.displayBooks);

// Event Listeners add book

document.querySelector(".book-form").addEventListener("submit", function(e) {
    // Get form values
    const title = document.querySelector("#title").value,
        author = document.querySelector("#author").value,
        isbn = document.querySelector("#isbn").value;

    // instanciate book
    const book = new Book(title, author, isbn);

    // Instanciate UI
    const ui = new UI();

    // Validate
    if (title === "" || author === "" || isbn === "") {
        // Error Alert
        ui.showAlert("Por favor, preencha todos os campos", "error");
    } else {
        // add book to list
        ui.addBookToList(book);

        // add at LS
        Store.addBook(book);

        // show sucess alert
        ui.showAlert("Oba, mais um livro adicionado!", "success");

        // Clear fields
        ui.clearFields();
    }

    e.preventDefault();
});

// Event listener for delete
document.querySelector("#book-list").addEventListener("click", function(e) {
    // inicializate UI
    const ui = new UI();

    if (e.target.className === "delete") {
        ui.deleteBook(e.target);
        ui.showAlert("Livro apagado com sucesso", "success");

        Store.removeBook(
            e.target.parentElement.previousElementSibling.textContent
        );
    }

    // Show Message
    //ui.showAlert("Livro apagado com sucesso", "success");
    e.preventDefault();
});
