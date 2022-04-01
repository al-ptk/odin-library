'use strict';
const p = (str) => console.log(str);

const myLibrary = {
    booklist: [],
    addBook: function (book) {
        this.booklist.push(book)
    }
}

class Book {
    constructor (title, author, pages, hasRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.hasRead = hasRead;
    }

    getReadStatus () {
        return this.hasRead
            ? 'already read'
            : 'not read yet';
    }

    info () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.getReadStatus()}.`
    }
}

const theHobbit = new Book ('The Hobbit', 'J.R.R. Tolkien', 295, false);
p(theHobbit.info());