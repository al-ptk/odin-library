'use strict';

function p(str) {
    return console.log(str);
}

function newEl(tag, parent) {
    return parent.appendChild(document.createElement(tag));
}  

class Library {
    constructor () {
        this.booklist = [];
        this.buildLibraryWidget();
    }

    buildLibraryWidget () {
        this.DOMreference = document.createElement('div');
        this.DOMreference.classList.add('library');

        const addButton = newEl('button', this.DOMreference);
        addButton.classList.add('addBook');
        addButton.textContent = 'Add Book';
        addButton.addEventListener('click', (e) => {
            e.target.style.display = 'none';
            const showButton = () => e.target.style.display = 'block';
            addBookModal (this, showButton);
        });

        root.appendChild(this.DOMreference);
    }

    addBook (book) {
        book.bookId = this.booklist.length;
        book.parent = this;
        this.booklist.push(book);
        this.DOMreference.appendChild(book.DOMreference);
    }

    removeBook (bookId) {
        for (let i = 0; i < this.booklist.length; i++) {
            const currBook = this.booklist[i];
            if (currBook.bookId === bookId) {
                const bookReference = currBook.DOMreference;
                this.DOMreference.removeChild(bookReference);
                this.booklist.splice(i, 1);
            }
        }
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
        this.parent = undefined;
        this.bookId = undefined;
        this.buildBookWidget();
    }

    getReadStatus () {
        return this.hasRead
            ? 'Done'
            : 'To Read';
    }

    info () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.getReadStatus()}.`
    }

    buildBookWidget () {
        this.DOMreference = document.createElement('div');
        this.DOMreference.classList.add('book');

        //The repetition below is me not wanting to create a mini-framework

        const thumbnail = newEl ('object', this.DOMreference);
        thumbnail.classList.add('thumbnail');
        thumbnail.setAttribute('type', 'image/svg+xml')
        thumbnail.setAttribute('data', './book-pictogram.svg')

        const bookInfo = newEl ('div', this.DOMreference);
        bookInfo.classList.add('bookInfo');

        const deleteButton = newEl ('button', bookInfo);
        deleteButton.textContent = 'X';
        deleteButton.classList.add('deleteButton');
        deleteButton.addEventListener ('click', e => {
            this.parent.removeBook(this.bookId);
        })

        const title = newEl('p', bookInfo);
        const titleProperty = newEl('span', title);
        titleProperty.style.fontWeight = 'bold';
        titleProperty.textContent = 'Title: ';
        const titleValue = newEl('span', title);
        titleValue.textContent = this.title;

        const author = newEl('p', bookInfo);
        const authorProperty = newEl('span', author);
        authorProperty.style.fontWeight = 'bold';
        authorProperty.textContent = 'Author: ';
        const authorValue = newEl('span', author);
        authorValue.textContent = this.author;

        const pages = newEl('p', bookInfo);
        const pagesProperty = newEl('span', pages)
        pagesProperty.style.fontWeight = 'bold';
        pagesProperty.textContent = 'Pages: ';
        const pagesValue = newEl('span', pages);
        pagesValue.textContent = this.pages;

        const hasRead = newEl ('p', bookInfo)
        const hasReadProperty = newEl('span', hasRead);
        hasReadProperty.style.fontWeight = 'bold';
        hasReadProperty.textContent = 'Status: ';
        const hasReadButton = newEl('button', hasRead);
        hasReadButton.classList.add('hasReadButton');
        if (!this.hasRead) hasReadButton.classList.add('unread');
        hasReadButton.textContent = this.getReadStatus();
        hasReadButton.addEventListener('click', (e) => {
            this.hasRead = !this.hasRead;
            e.target.classList.toggle('unread');
            e.target.textContent = this.getReadStatus();
        })
    }
}

function addBookModal (library, callback) {
    const container = newEl ('div', root);
    container.classList.add('addBookModal');

    //The repetition below is me not wanting to create a mini-framework

    // Close Button
    const closeButton = newEl('button', container);
    closeButton.textContent = 'X'
    closeButton.classList.add('closeModal');
    closeButton.addEventListener('click', e => {
        callback();
        root.removeChild(container);
    });

    // Title Input
    const titleLabel = newEl('label', container);
    titleLabel.textContent = "Title:"
    titleLabel.setAttribute('for', 'titleInput');
    
    const titleInput = newEl('input', container);
    titleInput.name = 'title';
    titleInput.id = 'titleInput';
    titleInput.required = true;

    // Author Input
    const authorLabel = newEl('label', container);
    authorLabel.textContent = "Author:";
    authorLabel.setAttribute('for', 'authorInput');

    const authorInput = newEl('input', container);
    authorInput.name = 'author';
    authorInput.id = 'authorInput';

    // Pages Input
    const pagesLabel = newEl('label', container);
    pagesLabel.textContent = 'Total of pages:';
    pagesLabel.setAttribute('for', 'pagesInput');

    const pagesInput = newEl('input', container);
    pagesInput.name = 'pages';
    pagesInput.id = 'pagesInput';
    pagesInput.setAttribute('type', 'number');

    // Has Read Input
    const hasReadArea = newEl ('div', container);

    const hasReadInput = newEl ('input', hasReadArea);
    hasReadInput.setAttribute('type', 'checkbox');
    hasReadInput.name = "hasRead";
    hasReadInput.id = "hasReadInput";
    hasReadInput.value = true;

    const hasReadLabel = newEl('label', hasReadArea);
    hasReadLabel.textContent = 'Have you read it?';
    hasReadLabel.setAttribute('for', 'hasReadInput');

    // Submit Book Input
    const submitBookButton = newEl('button', container);
    submitBookButton.textContent = "Add New Book";
    submitBookButton.id = 'submitBookButton';
    submitBookButton.addEventListener('click', e => 
    {
        if (titleInput.value === '' || titleInput.value === 'Title Required!!') {
            titleInput.value = 'Title Required!!';
            return;
        }

        if (authorInput.value === '' || authorInput.value === 'Author Required!!') 
        {
            authorInput.value = 'Author Required!!';
            return;
        }
        
        if (pagesInput.value === '' 
            || pagesInput.value === 'Author Required!!'
            || pagesInput.value <= 0)
        {
            pagesInput.value = 0;
            return;
        }

        const book = new Book (
            titleInput.value,
            authorInput.value,
            pagesInput.value,
            hasReadInput.checked
        )
        library.addBook(book);
        callback();        
        root.removeChild(container);
    });
};

function deleteModal () {

}



var root = document.querySelector('#root');
const myLibrary = new Library ();
[
    new Book ('O Hobbit', 'J.R.R. Tolkien', 295, false),
    new Book ('O Jogo de Tronos', 'G.R.R. Martin', 800, true),
    new Book ('O Alienista', 'Machado de Assis', 200, true),
    new Book ('Crônicas de Narnia', 'C.S. Lewis', 400, true)
].forEach(elem => myLibrary.addBook(elem))