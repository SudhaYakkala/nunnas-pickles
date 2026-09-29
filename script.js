// NUNNA'S PICKLES - shop logic. No database, no API keys.

// ===== EDIT HERE: WhatsApp number and prices =====
const WHATSAPP_NUMBER = "919398556948"; // India country code 91 + number
const SIZE_LABELS = { 250: "250g", 500: "500g", 1000: "1kg" };

// Image filenames must match the product (files go in the images/ folder).
const PRODUCTS = [
  { id: "avakaya", name: "Avakaya", img: "images/avakaya.jpg",
    desc: "Traditional Andhra-style mango pickle with bold spices and authentic homemade flavour.",
    prices: { 250: 179, 500: 329, 1000: 599 } },
  { id: "lemon", name: "Lemon Pickle", img: "images/lemon-pickle.jpg",
    desc: "Tangy lemon pieces in a spiced Indian pickle masala, lovely with curd rice.",
    prices: { 250: 169, 500: 319, 1000: 579 } },
  { id: "chilli", name: "Red Chilli Pickle", img: "images/red-chilli-pickle.jpg",
    desc: "Fiery red chillies in a robust spice blend for those who like real heat.",
    prices: { 250: 179, 500: 329, 1000: 599 } },
  { id: "tomato", name: "Tomato Pickle", img: "images/tomato-pickle.jpg",
    desc: "Tangy, spicy tomato pickle that pairs well with hot rice, dosa and idli.",
    prices: { 250: 169, 500: 319, 1000: 579 } },
  { id: "prawns", name: "Prawns Pickle", img: "images/prawns-pickle.jpg",
    desc: "Rich prawn pickle made in traditional Indian pickle style. Best with rice and ghee.",
    prices: { 250: 299, 500: 549, 1000: 999 } }
];

let cart = []; // each item: { id, size, qty }
const money = n => "₹" + n.toLocaleString("en-IN");
const $ = id => document.getElementById(id);

// ----- Build the 5 product cards -----
function buildProducts() {
  $("productGrid").innerHTML = PRODUCTS.map(p => `
    <article class="card" data-id="${p.id}">
      <div class="card-img"><img src="${p.img}" alt="${p.name}" loading="lazy"
        onerror="this.replaceWith(document.createTextNode('${p.name} - add photo'))"></div>
      <div class="card-body">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="sizes">
          ${Object.keys(p.prices).map((s, i) => `
            <label class="size"><span><input type="radio" name="size-${p.id}" value="${s}" ${i === 1 ? "checked" : ""}> ${SIZE_LABELS[s]}</span><span>${money(p.prices[s])}</span></label>`).join("")}
        </div>
        <div class="qty-row">Qty
          <button type="button" data-act="minus" aria-label="Decrease">−</button>
          <b class="q">1</b>
          <button type="button" data-act="plus" aria-label="Increase">+</button>
        </div>
        <button class="add" type="button" data-act="add">Add to Order</button>
      </div>
    </article>`).join("");
}

// ----- Cart -----
function addToCart(id, size, qty) {
  const found = cart.find(i => i.id === id && i.size === size);
  if (found) found.qty += qty; else cart.push({ id, size, qty });
  renderCart();
}
function itemPrice(i) { return PRODUCTS.find(p => p.id === i.id).prices[i.size] * i.qty; }
function cartTotal() { return cart.reduce((t, i) => t + itemPrice(i), 0); }

function renderCart() {
  $("cartCount").textContent = cart.reduce((n, i) => n + i.qty, 0);
  $("cartTotal").textContent = money(cartTotal());
  $("cartItems").innerHTML = cart.length ? cart.map((i, idx) => `
    <div class="cart-row">
      <span><b>${PRODUCTS.find(p => p.id === i.id).name}</b> - ${SIZE_LABELS[i.size]}</span><span>${money(itemPrice(i))}</span>
      <div class="qty-row">
        <button data-cart="minus" data-i="${idx}" aria-label="Decrease">−</button><b>${i.qty}</b>
        <button data-cart="plus" data-i="${idx}" aria-label="Increase">+</button>
        <button class="rm" data-cart="remove" data-i="${idx}">Remove</button>
      </div>
    </div>`).join("") : '<p class="empty">Your order is empty. Add a pickle above.</p>';
}

// ----- WhatsApp message + validation -----
function sendOrder() {
  const name = $("custName").value.trim();
  const place = $("custLocation").value.trim();
  const err = $("orderError");
  err.style.color = "";
  if (!cart.length) return err.textContent = "Please add at least one pickle to your order.";
  if (!name) return err.textContent = "Please enter your name.";
  if (!place) return err.textContent = "Please enter your delivery location.";
  err.textContent = "";
  const lines = cart.map(i => `• ${PRODUCTS.find(p => p.id === i.id).name} - ${SIZE_LABELS[i.size]} - Qty ${i.qty} - ${money(itemPrice(i))}`);
  const msg = `Hello NUNNA'S PICKLES,\n\nI would like to place an order.\n\nOrder:\n${lines.join("\n")}\n\nProduct Total: ${money(cartTotal())}\n\nCustomer Name: ${name}\nDelivery Location: ${place}\n\nPlease confirm availability, delivery charges and payment details.\n\nThank you.`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  err.style.color = "#1f8f4e";
  err.textContent = "Opening WhatsApp... please tap the Send button there to place your order.";
  // If the browser blocks the new tab, open WhatsApp in the same tab instead
  if (!window.open(url, "_blank")) window.location.href = url;
}

// ----- Events -----
$("productGrid").addEventListener("click", e => {
  const act = e.target.dataset.act; if (!act) return;
  const card = e.target.closest(".card"), q = card.querySelector(".q");
  if (act === "plus") q.textContent = Math.min(20, +q.textContent + 1);
  if (act === "minus") q.textContent = Math.max(1, +q.textContent - 1);
  if (act === "add") {
    const size = card.querySelector("input:checked").value;
    addToCart(card.dataset.id, size, +q.textContent);
    e.target.textContent = "Added ✓"; setTimeout(() => e.target.textContent = "Add to Order", 1200);
  }
});
$("cartItems").addEventListener("click", e => {
  const act = e.target.dataset.cart, i = +e.target.dataset.i; if (!act) return;
  if (act === "plus") cart[i].qty++;
  if (act === "minus") cart[i].qty = Math.max(1, cart[i].qty - 1);
  if (act === "remove") cart.splice(i, 1);
  renderCart();
});
$("sendOrder").addEventListener("click", sendOrder);
$("menuBtn").addEventListener("click", () => {
  const open = $("nav").classList.toggle("open");
  $("menuBtn").setAttribute("aria-expanded", open);
});
$("nav").addEventListener("click", () => $("nav").classList.remove("open"));

buildProducts();
renderCart();