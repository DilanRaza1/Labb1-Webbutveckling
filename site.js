const products = [
  {
    name: "Kaffe och Bulle",
    image: "https://allagodating.se/wp-content/uploads/2013/04/IMG_7786.jpg",
    price: 25,
    style: "width: auto; height: 285px",
  },
  {
    name: "Te och Kakor",
    image:
      "https://koala.sh/api/image/v2-bv5kx-l3h2c.jpg?width=1216&height=832&dream",
    price: 20,
    style: "width: auto; height: 285px",
  },
  {
    name: "Bokhyllan (1 timme)",
    image:
      "https://www.svtstatic.se/image-news/480/wide/0.5/0.5/e-31022270-1619504157000",
    price: 45,
    style: "width: auto; height: 285px",
  },
  {
    name: "Bokklubbspaket",
    image:
      "https://flygvapenmuseum.se/wp-content/uploads/sites/3/2022/01/Bocker-ljud-bild-2048x1286.jpg",
    price: 80,
    style: "width: auto; height: 285px",
  },
  {
    name: "Bokpresentkort",
    image: "pictures/bokhörnan.png",
    price: 50,
    style: "width: auto; height: 285px",
  },
];

let cart = [];

function loadCart() {
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
  }
  updateCart();
}

function displayProducts() {
  const productList = document.getElementById("product-list");
  if (productList) {
    productList.innerHTML = products
      .map(
        (product) => `
      <div class="col-md-4 mb-4">
        <div class="card">
          <img src="${product.image}" alt="${
          product.name
        }" class="card-img-top" style="${product.style || ""}">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.price} SEK</p>
            <button class="btn btn-primary" onclick="addToCart('${
              product.name
            }', ${product.price})">Lägg till</button>
          </div>
        </div>
      </div>
    `
      )
      .join("");
  }
}

function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
}

function removeFromCart(index, event) {
  if (event) event.stopPropagation();
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  if (cartItems) {
    cartItems.innerHTML = cart
      .map(
        (item, index) => `
      <li class="dropdown-item d-flex justify-content-between align-items-center">
        ${item.name} - ${item.price} SEK
        <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index}, event)">Ta bort</button>
      </li>
    `
      )
      .join("");
  }

  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.textContent = cart.length;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

function clearCart(event) {
  if (event) event.stopPropagation();
  cart = [];
  updateCart();
}

document.addEventListener("click", function (event) {
  const cartDropdown = document.getElementById("cart-dropdown");
  const cartToggle = document.getElementById("cartDropdown");

  if (cartDropdown && cartToggle) {
    if (
      event.target.closest("#cart-dropdown") ||
      event.target.closest("#cartDropdown")
    ) {
      cartDropdown.classList.add("show");
      cartToggle.setAttribute("aria-expanded", "true");
    }
  }
});

loadCart();
displayProducts();
