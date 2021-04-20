//App

let myLibrary = [
];
let numberOfBooks = 0;
let globalID = 0;
let totalread = Object.values(myLibrary).reduce((a, item) => a + item, 0);
let lastedited
let totalpages = 0;
let username = document.getElementById("username").textContent


function book(numberOfBooks ,title, author, pages, isRead) {
    this.number = numberOfBooks
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
    this.info = function() {
        return title + ", " + author + ", " + pages + ", " + isRead
    }
}

function addBookToLibrary(numberOfBooks, title, author, pages, isRead) {
    const newBook = new book(numberOfBooks, title, author, pages, isRead);
    myLibrary.push(newBook)
}

function openForm() {
    document.getElementById("myForm").style.display = "inherit";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

function addBookDiv(number, title, author, pages, isRead) {

    const bookInner = document.createElement("div");
            const titleContent = document.createElement("h1");
            const hr2 = document.createElement("hr");
            const details = document.createElement("div");
                const authorContent = document.createElement("h2");
                const pagesContent = document.createElement("h2");
                const readButton = document.createElement("button");
                const deleteButton = document.createElement("button");

    bookInner.classList.add("book");
    bookInner.setAttribute("id", number)
    console.log("added DIV ID" + number)
    titleContent.classList.add("title");
    details.classList.add("details");
    authorContent.classList.add("author");
    pagesContent.classList.add("pages");
    readButton.classList.add("read");
    readButton.setAttribute('onclick', 'toggleRead(this)')
    deleteButton.classList.add("delete");
    deleteButton.setAttribute('onclick', 'removeBook(this)')

    if(isRead == true){
        readButton.classList.add("bookread")
        totalread++
        updateStats()
    }

    titleContent.textContent = title;
    authorContent.textContent = author;
    pagesContent.textContent = pages;
    readButton.textContent = "✓";
    deleteButton.textContent = "X";

    document.getElementById("book-container").appendChild(bookInner);
            bookInner.appendChild(titleContent);
            bookInner.appendChild(hr2);
            bookInner.appendChild(details);
                details.appendChild(authorContent);
                details.appendChild(pagesContent);
                details.appendChild(readButton);
                details.appendChild(deleteButton);

}

function newBook() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const isRead = document.getElementById("isRead").checked;
    const number = globalID;
    document.getElementById("formObj").reset();
    document.getElementById("myForm").style.display = "none";
    event.preventDefault()
    addBookToLibrary(number, title, author, pages, isRead);
    addBookDiv(number, title, author, pages, isRead);
    numberOfBooks++;
    globalID++;
    updateStats();
    saveBooks();
    console.log(myLibrary);
}

function removeBook(elem) {
    let numberID = elem.parentNode.parentNode.id;
    let toremove = document.getElementById(numberID)
    toremove.remove();
    console.log(toremove)

    myLibrary = myLibrary.filter(function(elem) {
        console.log("elem.numb searching through" + elem.number)
        console.log("numberID toremove" + numberID)
        console.log("returned ")
        console.log(elem.number != numberID)
        return elem.number != numberID
    })
    numberOfBooks--;
    updateStats();
    saveBooks();
    console.log(myLibrary)
}


function toggleRead(elem) {
        let numberID = elem.parentNode.parentNode.id;

        for( let i = 0; i < myLibrary.length; i++){
            if(myLibrary[i].number == numberID){
                console.log(myLibrary[i])
                if(myLibrary[i].isRead == false){
                    elem.classList.add("bookread");
                    myLibrary[i].isRead = true;
                    totalread++
                    console.log(myLibrary[i])
                    saveBooks()
                    updateStats()
                } else {
                    elem.classList.remove("bookread");
                    myLibrary[i].isRead = false;
                    totalread--
                    console.log(myLibrary[i])
                    saveBooks()
                    updateStats()
                }
            }
        }
    }


function emptyLibrary() {
    const books = document.getElementsByClassName('book');
    while(books[0]) {
        books[0].parentNode.removeChild(books[0]);
    }
    myLibrary = [];
    numberOfBooks = 0;
    totalread = 0;
    totalpages = 0;
    updateStats();
    saveBooks();
    }

function updateStats() {
    totalpages = 0;
    for (const element of myLibrary) {
        if(element != null) {
            console.log(element.pages)
            console.log(totalpages)
            let pages = parseInt(element.pages,10)
            totalpages += pages
        }
    }
    console.log(totalpages)

    document.getElementById("display-books").innerHTML = numberOfBooks;
    document.getElementById("display-read").innerHTML = totalread;
    document.getElementById("display-pages").innerHTML = totalpages;
    document.getElementById("last-edit").innerHTML = lastedited;
}   



//Local Storage

if(!localStorage.getItem('myLibrary')) {
    saveBooks();
    myLibrary = [];
    numberOfBooks = myLibrary.length;
    totalread = 0;
  } else {
    loadBooks();
  }

function saveBooks() {
    console.log("saving " + myLibrary)
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
    localStorage.setItem("globalID", globalID)
    localStorage.setItem("booksread", totalread)
    localStorage.setItem('time', +new Date);
    localStorage.setItem('username', username)

    console.log("myLibrary saved ")
}


function loadBooks() {
    globalID = localStorage.getItem("globalID")
    totalread = localStorage.getItem("booksread")
    username = localStorage.getItem("username")
    time = Date(parseInt(localStorage.getItem('time')));
    lastedited = "Last online " + time;
    console.log(lastedited)
    let objects = JSON.parse(localStorage.getItem("myLibrary"))
    myLibrary = objects;
    numberOfBooks = 0;
    
    for(let element of objects){
        addBookDiv(element.number, element.title, element.author, element.pages, element.isRead);
        numberOfBooks++;
    }
    updateStats();
    console.log("Loaded " + objects)
}

