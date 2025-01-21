document.addEventListener("DOMContentLoaded", () => {
  const name = document.getElementById("nome");
  const salva = document.getElementById("salva");
  const rimuovi = document.getElementById("rimuovi");
  const valore = document.getElementById("savedValue");

  // valore visibile
  function valoreSalvato() {
    const savedValue = localStorage.getItem("nome");
    if (savedValue) {
      valore.textContent = `Valore salvato: ${savedValue}`;
    } else {
      valore.textContent = "Nessun valore salvato.";
    }
  }

  // salva valore nel localStorage
  salva.addEventListener("click", () => {
    const nome = name.value.trim();
    if (nome) {
      localStorage.setItem("nome", nome);
      valoreSalvato();
    }
  });

  // rimuove valore dal localStorage
  rimuovi.addEventListener("click", () => {
    localStorage.removeItem("nome");
    valoreSalvato();
  });

  // visualizza il valore nella pagina
  valoreSalvato();
});

document.addEventListener("DOMContentLoaded", () => {
  const contatore = document.getElementById("contatore");

  // Recupera il valore salvato in sessionStorage o inizializza a 0
  let tempo = parseInt(sessionStorage.getItem("tempo")) || 0;

  // Visualizza il contatore
  function updateContatore() {
    tempo++;
    contatore.textContent = `Tempo trascorso: ${tempo} secondi`;
    sessionStorage.setItem("tempo", tempo);
  }

  // Aggiorna il contatore ogni secondo
  setInterval(updateContatore, 1000);

  // Mostra il valore
  contatore.textContent = `Tempo trascorso: ${tempo} secondi`;
});
