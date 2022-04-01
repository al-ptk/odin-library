'use strict';
const p = (str) => console.log(str);

const myLibrary = {
    booklist: [],
    addBook: function (book) {
        this.booklist.push(book)
    },
    getBooklist: function () {
        return this.booklist;
    }
}

class Book {
    constructor (title, author, pages, hasRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.hasRead = hasRead;
        this.DOMreference;
    }

    getReadStatus () {
        return this.hasRead
            ? 'already read'
            : 'not read yet';
    }

    info () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.getReadStatus()}.`
    }

    /* Building the Book Widget uses private data, so it goes here, instead of the myLybrary object, which manages books. However! Where is the DOM element reference stored? The reference should stay within the object, but accessed by myLibrary when doing the rendering of all books.*/
    buildBookWidget () {
        this.DOMreference = document.createElement('div');
        this.DOMreference.classList.add('book');
        
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

function configureDOMelement (tag, content, parent) {
    const elem = document.createElement(tag);
    elem.textContent = content;
    parent.appendChild(elem);
}

const theHobbit = new Book ('The Hobbit', 'J.R.R. Tolkien', 295, false);
p(theHobbit.info());
myLibrary.addBook(theHobbit);
p(myLibrary.getBooklist());