'use strict';
const p = (str) => console.log(str);
const ROOT = document.querySelector('#root');

class Library {
    constructor () {
        this.booklist = [];
        this.DOMreferece = document.createElement('div');
    }

    buildLibraryWidget () {
        this.DOMreferece.classList.add('library');
        for (const elem of this.booklist) {
            // elem.buildBookWidget();
            p(elem);
        }
    }

    addBook (book) {
        this.booklist.push(book)
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

        const configureDOMelement = function (tag, content, parent) {
            const elem = document.createElement(tag);
            elem.textContent = content;
            parent.appendChild(elem);
        };
        
        [
            this.title,
            this.author,
            this.pages,
            this.hasRead
        ].forEach((property) => {
            configureDOMelement('p', property, this.DOMreference)
        });
    }
}

const theHobbit = new Book ('The Hobbit', 'J.R.R. Tolkien', 295, false);
const myLibrary = new Library ();
myLibrary.addBook(theHobbit);
myLibrary.buildLibraryWidget();