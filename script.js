'use strict';
const p = (str) => console.log(str);
const newEl = (tag, parent) => {
    return parent.appendChild(document.createElement(tag))
};
const root = document.querySelector('#root');

function addBookModal (library, callback) {
    const container = newEl ('div', root);
    container.classList.add('addBookModal');

    //The repetition below is me not wanting to create a mini-framework
    const titleLabel = newEl('label', container);
    titleLabel.textContent = "Title:"
    titleLabel.setAttribute('for', 'titleInput');
    
    const titleInput = newEl('input', container);
    titleInput.name = 'title';
    titleInput.id = 'titleInput';    

    const authorLabel = newEl('label', container);
    authorLabel.textContent = "Author:";
    authorLabel.setAttribute('for', 'authorInput');

    const authorInput = newEl('input', container);
    authorInput.name = 'author';
    authorInput.id = 'authorInput';

    const pagesLabel = newEl('label', container);
    pagesLabel.textContent = 'Total of pages:';
    pagesLabel.setAttribute('for', 'pagesInput');

    const pagesInput = newEl('input', container);
    pagesInput.name = 'pages';
    pagesInput.id = 'pagesInput';

    const hasReadArea = newEl ('div', container);

    const hasReadInput = newEl ('input', hasReadArea);
    hasReadInput.setAttribute('type', 'checkbox');
    hasReadInput.name = "hasRead";
    hasReadInput.id = "hasReadInput";

    const hasReadLabel = newEl('label', hasReadArea);
    hasReadLabel.textContent = 'Have you read it?';
    hasReadLabel.setAttribute('for', 'hasReadInput');

    const submitBookButton = newEl('button', container);
    submitBookButton.textContent = "Add New Book";
    submitBookButton.id = 'submitBookButton';
    submitBookButton.addEventListener('click', e => {
        const book = new Book (
            titleInput.value,
            authorInput.value,
            pagesInput.value,
            hasReadInput.value === "on"
            ? true
            : false
        )
        library.addBook(book);
        callback();        
        root.removeChild(container);
    });
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
            e.target.style.display = 'none';
            const showButton = () => e.target.style.display = 'block';
            addBookModal (this, showButton);
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