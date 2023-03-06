class Book {
  constructor(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
  }
}
let booksarr = [];
class Display {
  addbookinthetable() {
    let books = localStorage.getItem("books");
    if (books == null) {
      booksarr = [];
    } else {
      booksarr = JSON.parse(books);
    }
    let html = "";
    let tbody = document.getElementById("tbody");
    booksarr.forEach(function (e, i) {
      html += `<tr>
            <th scope="row">${i + 1}</th>
            <td>${e.name}</td>
            <td>${e.author}</td>
            <td>${e.type}</td>
            <td>
                <!-- Call to action buttons -->
                <ul class="list-inline m-0">
                <li class="list-inline-item">
                <button class="btn btn-danger btn-sm rounded-0" id=${i} onClick="deleten(this.i)" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i></button>
                </li>
                </ul>
            </td>
          </tr>`;
    });
    tbody.innerHTML = html;
  }
  addbookinthels(book) {
    let books = localStorage.getItem("books");
    if (books == null) {
      booksarr = [];
    } else {
      booksarr = JSON.parse(books);
    }
    booksarr.push(book);
    localStorage.setItem("books", JSON.stringify(booksarr));
  }
  clear() {
    let addbook = document.getElementById("addbook");
    addbook.reset();
  }
  validate(book) {
    if (
      book.name.length == 0 ||
      book.author.length == 0 ||
      book.type.length == 0
    ) {
      return false;
    } else return true;
  }
  show(type, msg) {
    let alert = document.getElementById("alert");
    let ahtml = `
    <svg xmlns="http://www.w3.org/2000/svg" style="display: none">
        <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
          <path
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
          />
        </symbol>
        <symbol
          id="exclamation-triangle-fill"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
          />
        </symbol>
      </svg>`;
    let img;
    if (type == "success") {
      img = "check-circle-fill";
    } else {
      img = "exclamation-triangle-fill";
    }
    ahtml += `
      <div class="alert alert-${type} d-flex align-items-center" role="alert">
      <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="${type}"><use xlink:href="#${img}"/></svg>
      <div>${msg}
      </div>
    </div>`;
    alert.innerHTML = ahtml;
    setTimeout(() => {
      alert.innerHTML = " ";
    }, 5000);
  }
}

function deleten(index) {
  let books = localStorage.getItem("books");
  if (books == null) {
    booksarr = [];
  } else {
    booksarr = JSON.parse(books);
  }
  booksarr.splice(index, 1);
  localStorage.setItem("books", JSON.stringify(booksarr));
  let display = new Display();
  display.addbookinthetable();
}

let display = new Display();
display.addbookinthetable();

// search
let search = document.getElementById("search");
search.addEventListener("input", searchinrow);
function searchinrow() {
  let input = search.value;
  let tbody = document.getElementsByClassName("tbody");
  Array.from(tbody).forEach((e) => {
    let td1 = e.getElementsByTagName("tr");
    Array.from(td1).forEach((el) => {
      let tdd1 = el.getElementsByTagName("td")[0].innerText;
      if (tdd1.includes(input)) {
      } else {
        el.style.display = "none";
      }

    });    
  });
  if(input==""){
    let display = new Display();
    display.addbookinthetable();
  }
}


let addbook = document.getElementById("addbook");
addbook.addEventListener("submit", addingbook);

function addingbook(e) {
  let name = document.getElementById("name").value;
  let author = document.getElementById("author").value;
  let type;
  let action = document.getElementById("action");
  let thriller = document.getElementById("thriller");
  let programming = document.getElementById("programming");
  if (action.checked) {
    type = action.value;
  } else if (thriller.checked) {
    type = thriller.value;
  } else if (programming.checked) {
    type = programming.value;
  }
  let book = new Book(name, author, type);
  let display = new Display();
  if (display.validate(book)) {
    display.addbookinthels(book);
    display.addbookinthetable();
    display.show("success", "Your book has been added successfully....");
  } else {
    display.show(
      "danger",
      "Please add a valid book name or author's name or type!!!"
    );
  }
  display.clear();
  e.preventDefault();
}
