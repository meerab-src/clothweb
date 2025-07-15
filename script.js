// Navigation toggle for mobile
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
  bar.addEventListener('click', () => {
    nav.classList.add('active');
  });
}

if (close) {
  close.addEventListener('click', () => {
    nav.classList.remove('active');
  });
}

// Product image switching
const mainImg = document.getElementById("MainImg");
const smallImgs = document.getElementsByClassName("small-img");

for (let i = 0; i < smallImgs.length; i++) {
  smallImgs[i].onclick = function () {
    mainImg.src = smallImgs[i].src;
  };
}

    
// Add to Cart Functionality

// cart.js

document.addEventListener("DOMContentLoaded", () => {
  const cartBody = document.querySelector("tbody");
  const totalDisplay = document.querySelector(".summary-box table");
  const checkoutBtn = document.querySelector(".normal");

  // Sample products (you would normally get this from shop.html via Add to Cart)
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }

  function removeItem(index) {
    cartItems.splice(index, 1);
    saveCart();
    renderCart();
  }

  function updateQuantity(index, newQty) {
    cartItems[index].quantity = newQty;
    saveCart();
    renderCart();
  }

  function renderCart() {
    cartBody.innerHTML = "";

    let subtotal = 0;

    cartItems.forEach((item, index) => {
      const total = item.price * item.quantity;
      subtotal += total;

      const row = document.createElement("tr");

      row.innerHTML = `
        <td><a href="#" data-remove="${index}"><i class="far fa-times-circle"></i></a></td>
        <td><img src="${item.image}" alt="" /></td>
        <td>${item.name}</td>
        <td>Rs ${item.price}</td>
        <td><input type="number" value="${item.quantity}" min="1" data-index="${index}" /></td>
        <td>Rs ${total}</td>
      `;

      cartBody.appendChild(row);
    });

    totalDisplay.innerHTML = `
      <tr>
        <td>Subtotal</td>
        <td>Rs ${subtotal}</td>
      </tr>
      <tr>
        <td>Shipping</td>
        <td>Free</td>
      </tr>
      <tr>
        <td><strong>Total</strong></td>
        <td><strong>Rs ${subtotal}</strong></td>
      </tr>
    `;
  }

  // Handle clicks & input
  cartBody.addEventListener("click", (e) => {
    if (e.target.closest("[data-remove]")) {
      e.preventDefault();
      const index = e.target.closest("[data-remove]").getAttribute("data-remove");
      removeItem(index);
    }
  });

  cartBody.addEventListener("input", (e) => {
    if (e.target.matches("input[type='number']")) {
      const index = e.target.getAttribute("data-index");
      const newQty = parseInt(e.target.value);
      if (newQty > 0) {
        updateQuantity(index, newQty);
      }
    }
  });

  checkoutBtn?.addEventListener("click", () => {
    alert("Checkout functionality is not implemented in this demo.");
  });

  renderCart();
});


// Add to Cart on Shop Page
document.querySelectorAll(".add-to-cart-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const name = btn.getAttribute("data-name");
    const price = parseInt(btn.getAttribute("data-price"));
    const image = btn.getAttribute("data-image");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if already in cart
    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ name, price, image, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} added to cart!`);
  });
});