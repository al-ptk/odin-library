'use strict';

function Main ()
{    
    var root = document.querySelector('#root');
    const myLibrary = new Library ();
    [
        new Book ('O Hobbit', 'J.R.R. Tolkien', 295, false),
        new Book ('O Jogo de Tronos', 'G.R.R. Martin', 800, true),
        new Book ('O Alienista', 'Machado de Assis', 200, true),
        new Book ('Crônicas de Narnia', 'C.S. Lewis', 400, true)
    ].forEach(elem => myLibrary.addBook(elem))
}

function p(str) {
    return console.log(str);
}

function newEl(tag, parent) {
    return parent.appendChild(document.createElement(tag));
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

        //The repetition below is me not wanting to create a mini-framework
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

Main();