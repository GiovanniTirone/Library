let myLibrary = [] ;

function book (title, author, pages, read,numberOfInsertion){

    this.title = title
    this.author = author
    this.pages =pages
    this.read = read
    this.numberOfInsertion = numberOfInsertion
    this.info = function () {
        let readStr = "";
        read ? readStr= "already read" : readStr="not read yet"; 
        return title + " by " + author + ", " + pages + " pages, " + readStr ; 
    }
}

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
}

addBookToLibrary (new book ("The Lord of the Rings", "Tolkien", 1200, true,1));
addBookToLibrary(new book ("I fratelli Karamazov", "Dostoevskij", 800, true, 2 ));
addBookToLibrary(new book ("Lo Hobbit","Tolkien", 300, true, 3));


function addBookToWindow(newBook){
    let card = document.createElement("div");
    card.id = "card_of_:_"+newBook.title;
    card.setAttribute("libraryPosition",myLibrary.indexOf(newBook));
    card.classList.add("card");

    let card_title_label = document.createElement("div");
    let card_author_label = document.createElement("div");
    let card_pages_label = document.createElement("div");
    let card_read_label = document.createElement("div");
    card_title_label.innerHTML = "Title:";
    card_author_label.innerHTML = "Author:" ;
    card_pages_label.innerHTML = "Pages: " ;
    card_read_label.innerHTML ="Already read: ";
    card_title_label.classList.add("card_title_label","col1");
    card_author_label.classList.add("card_author_label","col1");
    card_pages_label.classList.add("card_pages_label","col1");
    card_read_label.classList.add("card_read_label","col1");

    let card_title = document.createElement("div");
    let card_author = document.createElement("div");
    let card_pages = document.createElement("div");
    let card_read = document.createElement("div");
    let card_read_btn = document.createElement("button");
    let card_delate_btn_div = document.createElement("div");
    let card_delate_btn = document.createElement("button");
    card_title.classList.add("card_title","col2");
    card_author.classList.add("card_author","col2");
    card_pages.classList.add("card_pages","col2");
    card_read.classList.add("card_read","col2");
    card_read_btn.classList.add("card_read_btn");
    card_delate_btn_div.classList.add("card_delate_btn_div");
    card_delate_btn.classList.add("card_delate_btn");
    card.appendChild(card_title_label);
    card.appendChild(card_title);
    card.appendChild(card_author_label);
    card.appendChild(card_author);
    card.appendChild(card_pages_label);
    card.appendChild(card_pages);
    card.appendChild(card_read_label);
    card.appendChild(card_read);
    card_read.appendChild(card_read_btn);
    card.appendChild(card_delate_btn_div);
    card_delate_btn_div.appendChild(card_delate_btn);

    card_title.innerHTML = newBook.title;
    card_author.innerHTML = newBook.author;
    card_pages.innerHTML = newBook.pages;
    card_delate_btn.innerHTML = "Delate";
    if(newBook.read) {
        card_read_btn.innerHTML = "YES!"
    } else{
        card_read_btn.innerHTML = "No."
    }
         
    document.querySelector('.article').appendChild(card);   

}

function removeAllBooksFromWindow () {
    let cards = Array.from(document.querySelectorAll(".card"));
    for(let i=0; i<cards.length; i++){
        document.querySelector('.article').removeChild(cards[i]);   
    }
}

for(let i=0; i<myLibrary.length; i++){
    addBookToWindow(myLibrary[i]);
}

function addBook(e){
    if(e.target.id != "add_book_btn"){return};
    let newTitle= document.getElementById("title_input").value; 
    let newAuthor= document.getElementById("author_input").value;
    let newPages= document.getElementById("pages_input").value;
    let numberOfInsertion = myLibrary.length+1; 
    let newBook = new book(newTitle,newAuthor,newPages,false,numberOfInsertion);
    addBookToLibrary(newBook);
    addBookToWindow(newBook);
}

function delateBook (e){
    if(e.target.className != "card_delate_btn"){return};
    let thisBookCard = e.target.parentNode.parentNode;
    let libraryPosition = thisBookCard.getAttribute("libraryPosition") ;
    document.querySelector('.article').removeChild(thisBookCard); 
    myLibrary.splice(libraryPosition,1);
    if(myLibrary.length==0){
        return;
    } else{
        for(let i=libraryPosition; i<myLibrary.length;i++){
            let thisId = "card_of_:_" + myLibrary[i].title; 
            let thisCard = document.getElementById(thisId);
            let oldPosition = thisCard.getAttribute("libraryPosition");
            thisCard.setAttribute("libraryPosition",oldPosition-1) ; 
        }
    }
}

function changeRead(e){
    if(e.target.className != "card_read_btn"){return};
    let thisBookCard = e.target.parentNode.parentNode;
    let libraryPosition = thisBookCard.getAttribute("libraryPosition") ;
    let thisBook = myLibrary[libraryPosition];
    if (thisBook.read){
        thisBookCard.querySelector(".card_read_btn").innerHTML="No.";
        thisBook.read=false;
    } else{
        thisBookCard.querySelector(".card_read_btn").innerHTML="YES!";
        thisBook.read=true;
    }
}

window.addEventListener("click",addBook);
window.addEventListener("click",delateBook);
window.addEventListener("click",changeRead);

//order menu

let order_menu = document.createElement("div"); 
order_menu.id="order_menu";

let row_1 = document.createElement("div");
row_1.id="order_menu_row_1";
row_1.classList.add("order_menu_row");
row_1.innerHTML="Title";
order_menu.appendChild(row_1);
let row_2 = document.createElement("div");
row_2.id="order_menu_row_2";
row_2.classList.add("order_menu_row");
row_2.innerHTML="Author";
order_menu.appendChild(row_2);
let row_3 = document.createElement("div");
row_3.id="order_menu_row_3";
row_3.classList.add("order_menu_row");
row_3.innerHTML="Pages";
order_menu.appendChild(row_3);

let order_menu_arr = [row_1 , row_2, row_3];

let order_btn_div = document.getElementById("order_btn_div");
let order_btn = document.getElementById("order_btn");
 

function openMenu (e) {
    if(e.target.id != "order_btn"){return};
    order_btn_div.removeChild(document.getElementById("order_btn"));
    order_btn_div.appendChild(order_menu); 
}

function orderLibrary (orderChoice) {
    let orderedVariables = [];
    let newLibrary = []; 
    let l=myLibrary.length;
    if(orderChoice=="First added"){orderChoice="numberOfInsertion"};
    for (let i=0; i<l; i++){
        orderedVariables[i]=myLibrary[i][orderChoice];
        myLibrary[i].justAdded=false;
    }

    if(orderChoice != "pages"){
        orderedVariables.sort();
    }  else {
        orderedVariables.sort((a,b)=>b-a);
    };


    for(let i=0; i<l; i++){
        for(let j=0; j<l; j++){
            if(orderedVariables[i]==myLibrary[j][orderChoice] && myLibrary[j].justAdded==false){
                newLibrary[i]=myLibrary[j];
                myLibrary[j].justAdded=true;  
                break;
            }
        }
    } 
    for(let i=0; i<l; i++){
        console.log("myLibrary["+i+"]:"+ JSON.stringify(myLibrary[i]));
        console.log("newLibrary["+i+"]:"+JSON.stringify(newLibrary[i]));
        myLibrary[i]=newLibrary[i];
        console.log("myLibrary["+i+"]:"+ JSON.stringify(myLibrary[i]));
    }
    return myLibrary; 
}

function changeMenuOrder (e) {
    let orderChoice = "" ;
    if(e.target.parentNode == null || e.target.parentNode.id != "order_menu"){return};
    for(let i=1 ; i < 4 ; i++){
        let thisRow = "order_menu_row_"+i;
        if(e.target.id == thisRow){
            orderChoice = order_menu_arr[i-1].innerHTML;
            order_menu_arr[i-1].innerHTML=order_btn.innerHTML; 
            order_btn.innerHTML=orderChoice;
            order_btn_div.removeChild(order_menu);
            order_btn_div.appendChild(order_btn);
            removeAllBooksFromWindow();
        }
    }

    switch (orderChoice){
        case "Title":
            orderLibrary("title");
            for(let i=0; i<myLibrary.length; i++){
                addBookToWindow(myLibrary[i]);
            }
            break;

        case "Author":
            orderLibrary("author");
            for(let i=0; i<myLibrary.length; i++){
                addBookToWindow(myLibrary[i]);
            }
            break;
            
        case "Pages":
            orderLibrary("pages");
            for(let i=0; i<myLibrary.length; i++){
                addBookToWindow(myLibrary[i]);
            }
            break;

        case "First added":
            orderLibrary("First added");
            for(let i=0; i<myLibrary.length; i++){
                addBookToWindow(myLibrary[i]);
            }
            break;
            
    }
    
}

window.addEventListener("click",openMenu);
window.addEventListener("click",changeMenuOrder);
 
// Filter

