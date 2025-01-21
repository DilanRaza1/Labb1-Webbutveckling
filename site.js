const products = [
  {
    name: "Kaffe och Bulle",
    image:
      "https://allagodating.se/wp-content/uploads/2013/04/IMG_7786.jpg",
    price: 25,
  },
  {
    name: "Te och Kakor",
    image:
      "https://koala.sh/api/image/v2-bv5kx-l3h2c.jpg?width=1216&height=832&dream",
    price: 20,
  },
  {
    name: "Bokhyllan (1 timme)",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    price: 45,
  },
  {
    name: "Bokklubbspaket",
    image:
      "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    price: 80,
  },
  {
    name: "Bokpresentkort",
    image:
    "pictures/bokhörnan.png",
    price: 50,
    style: "width: 400; height: 320px;",
  }
];

let cart = [];

if (localStorage.getItem("cart")) {
  cart = JSON.parse(localStorage.getItem("cart"));
}

function displayProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = products
    .map(
      (product) => `
    <div class="col-md-4 mb-4">
      <div class="card">
        <img src="${product.image}" alt="${product.name}" class="card-img-top" style="${product.style || ''}">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.price} SEK</p>
          <button class="btn btn-primary" onclick="addToCart('${product.name}', ${product.price})">Lägg till</button>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  cartCount.textContent = cart.length;
}

function updateCartDropdown() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = cart
    .map(
      (item) => `
    <li class="dropdown-item">${item.name} - ${item.price} SEK</li>
  `
    )
    .join("");
}

function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  updateCartDropdown();
}

function clearCart() {
  cart = [];
  localStorage.removeItem("cart");
  updateCartCount();
  updateCartDropdown();
}

displayProducts();
updateCartCount();
updateCartDropdown();
