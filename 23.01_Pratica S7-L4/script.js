const API = "https://api.pexels.com/v1/search";
const imageContainer = document.getElementById("image-container").querySelector(".row");

// Funzione per fare richieste GET, con gestione degli errori con try...catch
const fetchImages = async (query) => {
  try {
    const response = await fetch(`${API}?query=${query}`, {
      headers: {
        Authorization: "dZkIk4i5jxPLzGFwvkb7aiAClDWYQUXXB0WddzULz4BONKFUFFENEmeP",
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data.photos; // Restituisce la lista di foto
    } else {
      console.error("Errore nella richiesta API");
    }
  } catch (err) {
    console.error("Errore:", err);
  }
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
    // Dentro renderImages, aggiungi questo evento per immagine e titolo
    col.querySelector("img").addEventListener("click", () => {
      window.location.href = `detail.html?id=${image.id}`;
    });

    col.querySelector(".card-title").addEventListener("click", () => {
      window.location.href = `detail.html?id=${image.id}`;
    });
  });
};

document.getElementById("load-images").addEventListener("click", async () => {
  const images = await fetchImages("hamsters");
  renderImages(images);
});

document.getElementById("load-secondary-images").addEventListener("click", async () => {
  const images = await fetchImages("tigers");
  renderImages(images);
});

document.getElementById("search-button").addEventListener("click", async () => {
  const query = document.getElementById("search-input").value;
  if (query) {
    const images = await fetchImages(query);
    renderImages(images);
  }
});
