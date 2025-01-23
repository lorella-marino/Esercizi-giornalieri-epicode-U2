const API = "https://api.pexels.com/v1/search";
const imageContainer = document.getElementById("image-container").querySelector(".row");

// Funzione per fare richieste GET
const fetchImages = (query) => {
  return fetch(`${API}?query=${query}`, {
    headers: {
      Authorization: "dZkIk4i5jxPLzGFwvkb7aiAClDWYQUXXB0WddzULz4BONKFUFFENEmeP",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.error("Errore nella richiesta API");
        return Promise.reject("Errore API");
      }
    })
    .then((data) => data.photos) // Restituisce la lista di foto
    .catch((err) => {
      console.error("Errore:", err);
    });
};

// Card
const renderImages = (images) => {
  imageContainer.innerHTML = ""; // Pulisce le immagini precedenti
  images.forEach((image) => {
    const col = document.createElement("div");
    col.classList.add("col-md-4");

    col.innerHTML = `
        <div class="card mb-4 shadow-sm">
          <img src="${image.src.medium}" class="card-img-top" alt="${image.photographer}" />
          <div class="card-body">
            <h5 class="card-title">${image.photographer}</h5>
            <p class="card-text">${image.alt || "No description available"}</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <button class="btn btn-sm btn-primary view-btn">View</button>
                <button class="btn btn-sm btn-danger hide-btn">Hide</button>
              </div>
              <small class="text-muted">${image.id}</small>
            </div>
          </div>
        </div>`;
    imageContainer.appendChild(col);

    // Nasconde la card
    col.querySelector(".hide-btn").addEventListener("click", () => col.remove());

    // Evento per entrare nell'html detail di immagine e titolo
    col.querySelector("img").addEventListener("click", () => {
      window.location.href = `detail.html?id=${image.id}`;
    });

    col.querySelector(".card-title").addEventListener("click", () => {
      window.location.href = `detail.html?id=${image.id}`;
    });
  });
};

document.getElementById("load-images").addEventListener("click", () => {
  fetchImages("hamsters").then((images) => {
    if (images) {
      renderImages(images);
    }
  });
});

document.getElementById("load-secondary-images").addEventListener("click", () => {
  fetchImages("tigers").then((images) => {
    if (images) {
      renderImages(images);
    }
  });
});

document.getElementById("search-button").addEventListener("click", () => {
  const query = document.getElementById("search-input").value;
  if (query) {
    fetchImages(query).then((images) => {
      if (images) {
        renderImages(images);
      }
    });
  }
});
