'use strict';
const p = (str) => console.log(str);
const root = document.querySelector('#root');

class Library {
    constructor () {
        this.booklist = [];
        this.buildLibraryWidget();
    }

    buildLibraryWidget () {
        this.DOMreferece = document.createElement('div');
        this.DOMreferece.classList.add('library');
        root.appendChild(this.DOMreferece);
    }

    addBook (book) {
        this.booklist.push(book);
        p(book);
        this.DOMreferece.appendChild(book.DOMreference);
    }
    
    getBooklist () {
        return this.booklist;
    }
}

class Book {
    constructor (title, author, pages, hasRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.hasRead = hasRead;
        this.buildBookWidget();
    }

    getReadStatus () {
        return this.hasRead
            ? 'already read'
            : 'not read yet';
    }

    info () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.getReadStatus()}.`
    }

    buildBookWidget () {
        this.DOMreference = document.createElement('div');
        this.DOMreference.classList.add('book');

        
    }
}

const theHobbit = new Book ('The Hobbit', 'J.R.R. Tolkien', 295, false);
const bob = new Book ('The Hobbit', 'J.R.R. Tolkien', 295, false);
const dob = new Book ('The Hobbit', 'J.R.R. Tolkien', 295, false);
const cob = new Book ('The Hobbit', 'J.R.R. Tolkien', 295, false);
const myLibrary = new Library ();
myLibrary.addBook(theHobbit);
myLibrary.addBook(bob);
myLibrary.addBook(dob);
myLibrary.addBook(cob);
myLibrary.buildLibraryWidget();