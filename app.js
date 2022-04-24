showNotes();
//maintains count of pin
let pinCount = 0;
let addNote = document.getElementById('addBtn');
let title = document.getElementById('titleTxt');
let addText = document.getElementById('addTxt');
addNote.addEventListener('click', function (e) {
    if (addText.value != "") {
        //local storage is a map<string,string>
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];

        } else {
            //makes the string back to an array
            notesObj = JSON.parse(notes);
        }
        //pair array of title and text
        pair = [];
        if (title.value == "") {
            pair.push(`Untitled`);
        } else {
            pair.push(title.value);
        }
        pair.push(addText.value);
        pair.push('not-pinned');
        pair.push('images/pin.svg');
        notesObj.push(pair);
        //convert array into string
        localStorage.setItem("notes", JSON.stringify(notesObj));
        title.value = "";
        addText.value = "";
        showNotes();
    } else {
        //gives warning toast if not is empty
        var toastLive = document.getElementById('liveToast');
        var toast = new bootstrap.Toast(toastLive);
        toast.show();
    }
});

//function to clear note
let clearNote = document.getElementById('clearBtn');
clearNote.addEventListener('click', function (e) {
    title.value = "";
    addText.value = "";
});

// function to display notes from local storage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    for (let i = 0; i < notesObj.length; i++) {
        html += `<div class="card col-lg-3 col-md-5 _card ${notesObj[i][2]}">
                <div class="card-body">
                <h5 class="card-title title note-title">${notesObj[i][0]}</h5>
                <button id="pinBtn${i}" onClick="pin(this.id)" class="btn pinBtn"><img src="${notesObj[i][3]}" alt="pin" id="pin"></button>
                <p class="card-text">${notesObj[i][1]}</p>
                </div>
                <div class="add-buttons">
                    <button id="${i}" onClick="deleteNote(this.id)" class="btn btn-primary delete">Delete Note</button>
                    <button id="e${i}" onClick="editNote(this.id)" class="btn btn-primary edit">Edit Note</button>
                </div>
               </div>`;
        //calling the deleteNode function and passing the button id
    }
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing to show! Add your notes.`;
    }
}
// function to pin notes
function pin(index) {
    let pinBtn = document.getElementById(index);
    index = index[index.length - 1];
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    if (pinBtn.firstElementChild.getAttribute('src') == 'images/pin.svg') {
        pinBtn.firstElementChild.setAttribute('src', 'images/pinned.svg');
        notesObj[index][2] = 'pinned';
        notesObj[index][3] = 'images/pinned.svg';
        const note = notesObj[index];
        notesObj.splice(index, 1);
        notesObj.splice(pinCount, 0, note);
        pinCount++;
    } else {
        pinBtn.firstElementChild.setAttribute('src', 'images/pin.svg');
        const note = notesObj[index];
        notesObj[index][2] = 'not-pinned';
        notesObj[index][3] = 'images/pin.svg';
        notesObj.splice(index, 1);
        notesObj.splice(pinCount - 1, 0, note);
        pinCount--;
    }
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}
//function to edit a note
function editNote(index) {
    index = index[index.length - 1];
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let title = document.getElementById('titleTxt');
    let addText = document.getElementById('addTxt');
    title.value = notesObj[index][0];
    addText.value = notesObj[index][1];
    deleteNote(index);
}
//function to delete a note
function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    //removing element from notesObj array and adding it back to local storage
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

//search function
let searchTxt = document.getElementById('searchTxt');
let textVal = "";
//collects user input as we type in searchBar
searchTxt.addEventListener('input', function (e) {
    textVal = searchTxt.value;
    //if the search bar is empty display all the notes back
    if (textVal == "") {
        let cards = document.getElementsByClassName('_card');
        for (let i = 0; i < cards.length; i++) {
            cards[i].style.display = "block";
        }
    }
});
let searchBtn = document.getElementById('searchBtn');
//searches when user click on the search button using the searchText entered by user in searchBar
searchBtn.addEventListener('click', function (e) {
    //cards is collection of all notes
    let cards = document.getElementsByClassName('_card');
    //titles is a collection of all note titles
    let titles = document.getElementsByClassName('note-title');
    //texts is collection of all notes text
    let texts = document.getElementsByClassName('card-text');
    for (let i = 0; i < cards.length; i++) {
        //if text of card includes searchText then display block else hide it
        if (texts[i].textContent.includes(textVal.toLowerCase()) || titles[i].textContent.includes(textVal.toLowerCase())) {
            cards[i].style.display = "block";
        } else {
            cards[i].style.display = "none";
        }
    }
});



// Further Features:
// 1. Mark a note as Important
// 2. Separate notes by user
// 3. Sync and host to web server 
