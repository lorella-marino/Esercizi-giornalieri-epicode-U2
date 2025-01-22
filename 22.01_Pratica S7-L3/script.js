fetch("https://striveschool-api.herokuapp.com/books")
  .then((ResponseObj) => {
    /* console.log(ResponseObj); */
    if (ResponseObj.ok) {
      // Si può usare direttamente Return, ma così controlliamo l'OK, ed è un passaggio più corretto
      return ResponseObj.json();
    }
  })

  .then((bookObj) => {
    // Il nome non ha importanza, se è un Obj o un Arr lo si vede dalla console
    /*  console.log(bookObj); */
    const row = document.getElementById("book-list");

    bookObj.forEach((book) => {
      /*  console.log(book.title); */
      const col = document.createElement("div");
      col.classList.add("col");

      col.innerHTML = ` <div class="card ">
                            <img src=${book.img}
                                class="card-img-top img-fluid" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${book.title}</h5>
                                <p class="card-text">${book.price}</p>
                                <button type="button" class="btn btn-secondary scarta-btn mt-1">Scarta</button>
                                <button type="button" class="btn btn-primary compra-btn mt-1">Compra ora</button>
                            </div>
                        </div>`;

      row.appendChild(col);

      const scartaBtn = col.querySelector(".scarta-btn");
      scartaBtn.addEventListener("click", () => {
        col.remove();
      });

      let carrello = JSON.parse(localStorage.getItem("carrello")) || []; // Verifica se ci sono già articoli nel carrello
      const compraBtn = col.querySelector(".compra-btn");
      compraBtn.addEventListener("click", () => {
        // Aggiungi il libro al carrello
        const carrello = JSON.parse(localStorage.getItem("carrello")) || [];
        carrello.push({ title: book.title, price: book.price });
        localStorage.setItem("carrello", JSON.stringify(carrello)); // Salva il carrello nel localStorage
        updateCarrello(); // Aggiorna la visualizzazione del carrello});
      });
    });
  })

  .catch((err) => console.log(err)); //serve per non rompere la pagina se ci sono errori

// Funzione per aggiornare e visualizzare il carrello
function updateCarrello() {
  const carrello = JSON.parse(localStorage.getItem("carrello")) || []; // Ottieni il carrello dal localStorage
  const carrelloList = document.getElementById("carrello-list");

  carrelloList.innerHTML = ""; // Svuota la lista prima di riempirla con i nuovi dati

  // Aggiunge il libro al carrello
  carrello.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.textContent = `${item.title} - ${item.price}`;
    carrelloList.appendChild(listItem);
  });
}

// Carica i dati dal localStorage al caricamento della pagina
document.addEventListener("DOMContentLoaded", updateCarrello);
