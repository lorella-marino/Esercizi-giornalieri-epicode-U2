// esercizio 1

class User {
  constructor(_firstName, _lastName, _age, _location) {
    this.firstName = _firstName;
    this.lastName = _lastName;
    this.age = _age;
    this.location = _location;
    this.confronto = function () {
      if (x.age > y.age) {
        return console.log("PersonaX è più vecchia di PersonaY");
      } else {
        return console.log("PersonaX è più giovane di PersonaY");
      }
    };
  }
}

const x = new User("Lorella", "Marino", 24, "Palermo");
console.log("PersonaX", x);

const y = new User("Mario", "Rossi", 32, "Roma");
console.log("PersonaY", y);

x.confronto();

// esercizio 2

class Pet {
  constructor(_petName, _ownerName, _species, _breed) {
    this.petName = _petName;
    this.ownerName = _ownerName;
    this.species = _species;
    this.breed = _breed;
    this.stessoPadrone = function () {
      if (p1.ownerName === p2.ownerName) {
        return console.log(true);
      } else {
        return console.log(false);
      }
    };
    this.lista = function () {
      return `Pet Name: ${this.petName}, Owner Name: ${this.ownerName}, Species: ${this.species}, Breed: ${this.breed}.`;
    };
  }
}

const p1 = new Pet("Billy", "Giacomo", "cane", "labdrador");
console.log("Cane", p1);

const p2 = new Pet("Cherry", "Sofia", "gatto", "soriano");
console.log("Gatto", p2);

p1.stessoPadrone();

const petForm = document.getElementById("petForm");
const petList = document.getElementById("petList");

petForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const petName = document.getElementById("petName").value;
  const ownerName = document.getElementById("ownerName").value;
  const species = document.getElementById("species").value;
  const breed = document.getElementById("breed").value;

  // Nuova istanza di Pet
  const newPet = new Pet(petName, ownerName, species, breed);

  // Aggiungere l'animale alla lista
  const listItem = document.createElement("li");
  listItem.textContent = newPet.lista();
  petList.appendChild(listItem);

  // Resettare il form
  petForm.reset();
});
