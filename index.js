console.log("connected")

class Book {
    constructor(b_name, b_author, b_type) {
        this.b_name = b_name;
        this.b_author = b_author;
        this.b_type = b_type
    }
}
class Display {

    validate(book) {
            if (book.b_name.length < 2 || book.b_author.length < 2) {
                return false;
            } else {
                return true;
            }
        }
        //for clearing the form
    clear() {
        let form = document.getElementById("BK_form");
        form.reset();
        // console.log("entered in clear")
    }
    show_books() {
        // console.log("connected to books")
        let h1 = document.getElementById('details')
        let lib = localStorage.getItem('lib');
        let table = document.getElementById('table')
        let libObj;
        if (lib == null) {
            libObj = [];
        } else {
            libObj = JSON.parse(lib)
        }
        if (libObj.length != 0) {
            h1.innerHTML = "your books are now"
                // table.style.display = "block";
            let string = "";
            libObj.forEach(element => {
                let tbody = document.getElementById("tbody");
                string += `<tr>
                <td>${element.b_name}</td>
                <td>${element.b_author}</td>
                <td>${element.b_type}</td>
              </tr>`
            });
            tbody.innerHTML = string;
        } else {
            // table.style.display = "none";
            h1.innerHTML = "Nothing is here"
        }
    }
    add(book) {

        let lib = localStorage.getItem('lib');
        let libObj;
        if (lib == null) {
            libObj = []
        } else {
            libObj = JSON.parse(lib)
        }
        libObj.push(book)
        localStorage.setItem('lib', JSON.stringify(libObj))
        this.show_books()
    }
}
let d = new Display()
d.show_books()
    //creatin an submit evenlistener

let f_submit = document.getElementById("BK_form");
f_submit.addEventListener('submit', (event) => {
    event.preventDefault()
    let b_name = document.getElementById('Bkname').value;
    let b_author = document.getElementById('author').value;
    let type;
    let friction = document.getElementById('fiction')
    let programming = document.getElementById('programming')
    let cooking = document.getElementById('cooking')
    if (friction.checked) {
        type = friction.value;
    } else if (programming.checked) {
        type = programming.value;

    } else if (cooking.checked) {
        type = cooking.value;
    }
    console.log(type, b_name, b_author)

    let book = new Book(b_name, b_author, type)
    console.log(book)
        //used for displaying the book

    let display = new Display()
    let messge = document.getElementById("message");
    if (display.validate(book)) {
        display.add(book)
        display.clear()
        messge.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>well done data is entered</strong> You should check in on some of those fields below.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`
        setTimeout(function() {
                messge.innerHTML = ''
            },
            2000)
    } else {
        messge.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>something went wrong</strong> You should check the input given below
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`
        setTimeout(function() {
            messge.innerHTML = ""
        }, 2000)
    }
})