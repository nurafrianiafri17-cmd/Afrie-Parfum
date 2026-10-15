// AFRIÉ Parfums — JavaScript Native (tanpa framework)
"use strict";
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-links a");
const bagCount = document.getElementById("bagCount");
const bagLink = document.getElementById("bagLink");
const cartDrawer = document.getElementById("cartDrawer");
const cartBackdrop = document.getElementById("cartBackdrop");
const cartClose = document.getElementById("cartClose");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const checkoutButton = document.getElementById("checkoutButton");
const continueShopping = document.getElementById("continueShopping");
const toast = document.getElementById("toast");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

// Ganti dengan nomor WhatsApp toko yang aktif. Format: kode negara tanpa +, spasi, atau strip.
// Contoh format Indonesia: 6281234567890
const WHATSAPP_NUMBER = "6285828487182";
const products = { "AFRIÉ Noir": 350000, "AFRIÉ Éclat": 320000, "AFRIÉ Ambre": 380000 };
const cart = {};
let toastTimer;
function formatRupiah(amount) { return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(amount).replace(/\u00a0/g, " "); }
function showToast(message) { toast.textContent = message; toast.classList.add("show"); window.clearTimeout(toastTimer); toastTimer = window.setTimeout(() => toast.classList.remove("show"), 3200); }

// Navigasi mobile.
menuToggle.addEventListener("click", () => { const expanded = menuToggle.getAttribute("aria-expanded") === "true"; menuToggle.setAttribute("aria-expanded", String(!expanded)); menuToggle.setAttribute("aria-label", expanded ? "Buka menu navigasi" : "Tutup menu navigasi"); navLinks.classList.toggle("active", !expanded); });
navItems.forEach(link => link.addEventListener("click", () => { navLinks.classList.remove("active"); menuToggle.setAttribute("aria-expanded", "false"); menuToggle.setAttribute("aria-label", "Buka menu navigasi"); }));

function cartCount() { return Object.values(cart).reduce((sum, item) => sum + item.quantity, 0); }
function cartSum() { return Object.values(cart).reduce((sum, item) => sum + item.price * item.quantity, 0); }
function renderCart() {
  cartItems.replaceChildren();
  const entries = Object.entries(cart);
  if (entries.length === 0) { const empty = document.createElement("p"); empty.className = "cart-empty"; empty.textContent = "Tas Anda masih kosong. Temukan aroma favorit Anda di koleksi AFRIÉ."; cartItems.appendChild(empty); checkoutButton.disabled = true; }
  else {
    entries.forEach(([name, item]) => {
      const row = document.createElement("article"); row.className = "cart-item";
      const details = document.createElement("div");
      const title = document.createElement("h3"); title.className = "cart-item-name"; title.textContent = name;
      const unit = document.createElement("p"); unit.className = "cart-item-price"; unit.textContent = `${formatRupiah(item.price)} / botol`;
      const controls = document.createElement("div"); controls.className = "cart-item-controls";
      const minus = document.createElement("button"); minus.type = "button"; minus.className = "qty-button"; minus.textContent = "−"; minus.setAttribute("aria-label", `Kurangi jumlah ${name}`); minus.addEventListener("click", () => changeQty(name, -1));
      const qty = document.createElement("span"); qty.className = "qty-number"; qty.textContent = String(item.quantity);
      const plus = document.createElement("button"); plus.type = "button"; plus.className = "qty-button"; plus.textContent = "+"; plus.setAttribute("aria-label", `Tambah jumlah ${name}`); plus.addEventListener("click", () => changeQty(name, 1));
      const remove = document.createElement("button"); remove.type = "button"; remove.className = "remove-item"; remove.textContent = "Hapus"; remove.addEventListener("click", () => { delete cart[name]; renderCart(); showToast(`${name} dihapus dari tas.`); });
      controls.append(minus, qty, plus, remove); details.append(title, unit, controls);
      const lineTotal = document.createElement("p"); lineTotal.className = "cart-item-line-total"; lineTotal.textContent = formatRupiah(item.price * item.quantity);
      row.append(details, lineTotal); cartItems.appendChild(row);
    }); checkoutButton.disabled = false;
  }
  cartTotal.textContent = formatRupiah(cartSum()); bagCount.textContent = String(cartCount());
}
function changeQty(name, delta) { if (!cart[name]) return; cart[name].quantity += delta; if (cart[name].quantity <= 0) delete cart[name]; renderCart(); }
function addToCart(name) { if (!(name in products)) { showToast("Produk belum tersedia. Silakan coba lagi."); return; } if (cart[name]) cart[name].quantity++; else cart[name] = { price: products[name], quantity: 1 }; renderCart(); showToast(`${name} ditambahkan ke tas belanja.`); }
function openCart() { renderCart(); cartDrawer.classList.add("open"); cartDrawer.setAttribute("aria-hidden", "false"); bagLink.setAttribute("aria-expanded", "true"); cartBackdrop.hidden = false; document.body.classList.add("cart-open"); cartClose.focus(); }
function closeCart() { cartDrawer.classList.remove("open"); cartDrawer.setAttribute("aria-hidden", "true"); bagLink.setAttribute("aria-expanded", "false"); cartBackdrop.hidden = true; document.body.classList.remove("cart-open"); bagLink.focus(); }
bagLink.addEventListener("click", openCart); cartClose.addEventListener("click", closeCart); cartBackdrop.addEventListener("click", closeCart); continueShopping.addEventListener("click", closeCart);
document.addEventListener("keydown", event => { if (event.key === "Escape" && cartDrawer.classList.contains("open")) closeCart(); });
document.querySelectorAll(".add-to-bag").forEach(button => button.addEventListener("click", () => addToCart(button.dataset.product)));

checkoutButton.addEventListener("click", () => {
  const entries = Object.entries(cart); if (!entries.length) { showToast("Tas belanja masih kosong."); return; }
  if (!/^\d{9,15}$/.test(WHATSAPP_NUMBER) || WHATSAPP_NUMBER === "6281234567890") { showToast("Ganti nomor WhatsApp toko di script.js sebelum mencoba pemesanan."); return; }
  const lines = entries.map(([name, item]) => `• ${name} x${item.quantity} — ${formatRupiah(item.price * item.quantity)}`);
  const message = ["Halo AFRIÉ Parfums, saya ingin memesan:", "", ...lines, "", `Total sementara: ${formatRupiah(cartSum())}`, "", "Mohon konfirmasi ketersediaan produk dan ongkir. Terima kasih."].join("\n");
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
});

// Validasi formulir kontak di browser.
const validators = { name: value => value.trim().length >= 2 ? "" : "Nama minimal 2 karakter.", email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? "" : "Masukkan alamat email yang valid.", topic: value => value ? "" : "Silakan pilih topik pesan.", message: value => value.trim().length >= 10 ? "" : "Pesan minimal 10 karakter." };
Object.keys(validators).forEach(name => { const field = document.getElementById(name); field.addEventListener("input", () => validateField(name)); field.addEventListener("change", () => validateField(name)); });
function validateField(name) { const field = document.getElementById(name); const error = document.getElementById(`${name}Error`); const message = validators[name](field.value); error.textContent = message; field.setAttribute("aria-invalid", String(Boolean(message))); return !message; }
contactForm.addEventListener("submit", event => { event.preventDefault(); const fields = Object.keys(validators); if (!fields.map(validateField).every(Boolean)) { formStatus.textContent = "Periksa kembali kolom yang masih perlu diperbaiki."; const first = fields.find(name => !validators[name](document.getElementById(name).value)); document.getElementById(first).focus(); return; } formStatus.textContent = "Terima kasih! Formulir demo berhasil divalidasi."; showToast("Pesan demo berhasil divalidasi. Data tidak dikirim ke server."); contactForm.reset(); fields.forEach(name => { document.getElementById(`${name}Error`).textContent = ""; document.getElementById(name).setAttribute("aria-invalid", "false"); }); });
document.getElementById("year").textContent = String(new Date().getFullYear());
renderCart();
