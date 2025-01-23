const API = "https://api.pexels.com/v1/photos/";

const params = new URLSearchParams(window.location.search);
const imageId = params.get("id");

const fetchImageDetail = (id) => {
  fetch(`${API}${id}`, {
    headers: { Authorization: "dZkIk4i5jxPLzGFwvkb7aiAClDWYQUXXB0WddzULz4BONKFUFFENEmeP" },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.error("Errore nella richiesta API");
        return Promise.reject("Errore API");
      }
    })
    .then((image) => {
      document.getElementById("image-detail").innerHTML = `
        <img src="${image.src.large}" class="img-fluid mb-3" alt="${image.alt}">
        <h2>${image.photographer}</h2>
        <a href="${image.photographer_url}" target="_blank" class="btn btn-primary">View Photographer</a>
      `;
    })
    .catch((err) => {
      console.error("Errore:", err);
    });
};

// Vai indietro
document.getElementById("back-button").addEventListener("click", () => {
  window.history.back();
});

// Chiama i dettagli
if (imageId) {
  fetchImageDetail(imageId);
}
