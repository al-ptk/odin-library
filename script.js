'use strict';
const p = (str) => console.log(str);
const newEl = (tag, parent) => {
    return parent.appendChild(document.createElement(tag))
};
const root = document.querySelector('#root');

function addBookModal (e) {
    p('hey');
    const container = document.createElement('form');
    container.classList.add('addBookModal');

    //The repetition below is me not wanting to create a mini-framework
    const titleLabel = newEl('label', container);
    titleLabel.textContent = "Title: \n"
    titleLabel.setAttribute('for', 'titleInput');
    
    const titleInput = newEl('input', container);
    titleInput.name = 'title';
    titleInput.id = 'titleInput';    

    const authorLabel = newEl('label', container);
    authorLabel.textContent = "Author: \n";
    authorLabel.setAttribute('for', 'authorInput');

    const authorInput = newEl('input', container);
    authorInput.name = 'author';
    authorInput.id = 'authorInput';


    root.appendChild(container);
};

class Library {
    constructor () {
        this.booklist = [];
        this.buildLibraryWidget();
    }

    buildLibraryWidget () {
        this.DOMreferece = document.createElement('div');
        this.DOMreferece.classList.add('library');

        const addButton = newEl('button', this.DOMreferece);
        addButton.classList.add('addBook');
        addButton.textContent = 'Add Book';
        addButton.addEventListener('click', (e) => {
            addBookModal();
            e.target.style.display = 'none';
        });

        root.appendChild(this.DOMreferece);
    }

    addBook (book) {
        this.booklist.push(book);
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

        const title = document.createElement('div');
        const titleProperty = document.createElement('span');
        titleProperty.style.fontWeight = 'bold';
        titleProperty.textContent = 'Title: ';
        title.append(titleProperty);
        const titleValue = document.createElement('span');
        titleValue.textContent = this.title;
        title.appendChild(titleValue);
        this.DOMreference.appendChild(title);

        const author = document.createElement('p');
        const authorProperty = document.createElement('span');
        authorProperty.style.fontWeight = 'bold';
        authorProperty.textContent = 'Author: ';
        author.append(authorProperty);
        const authorValue = document.createElement('span');
        authorValue.textContent = this.author;
        author.appendChild(authorValue);
        this.DOMreference.appendChild(author);

        const pages = document.createElement('p');
        pages.textContent = `Total pages: ${this.pages}`;
        this.DOMreference.appendChild(pages);

        const hasRead = document.createElement('p');
        hasRead.textContent = this.getReadStatus();
        this.DOMreference.appendChild(hasRead);
    }
}

const theHobbit = new Book ('The Hobbit', 'J.R.R. Tolkien', 295, false);
const bob = new Book ('The Zobbit', 'J.R.R. Tolkien', 295, false);
const dob = new Book ('The Ploobbit', 'J.R.R. Tolkien', 295, false);
const cob = new Book ('The Rabbit', 'J.R.R. Tolkien', 295, false);
const myLibrary = new Library ();
myLibrary.addBook(theHobbit);
myLibrary.addBook(bob);
myLibrary.addBook(dob);
myLibrary.addBook(cob);