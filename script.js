const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const bag = document.querySelector("[data-bag]");
const bagCount = document.querySelector("[data-bag-count]");
const toast = document.querySelector("[data-toast]");
const newsletter = document.querySelector("[data-newsletter]");

let bagItems = 0;
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

navToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

document.querySelectorAll(".product-card").forEach((card) => {
  card.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLButtonElement && target.classList.contains("wish")) {
      target.classList.toggle("is-active");
      target.textContent = target.classList.contains("is-active") ? "♥" : "♡";
      showToast(target.classList.contains("is-active") ? "Dodano do ulubionych" : "Usunięto z ulubionych");
      return;
    }

    bagItems += 1;
    bagCount.textContent = String(bagItems);
    showToast("Produkt dodany do torby");
  });
});

bag?.addEventListener("click", () => {
  showToast(bagItems ? `W torbie: ${bagItems} produkt(y)` : "Twoja torba jest pusta");
});

newsletter?.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = newsletter.querySelector("[data-form-message]");
  if (message) {
    message.textContent = "Dziękujemy. Pierwszy list Selection wkrótce trafi do Twojej skrzynki.";
  }
  newsletter.reset();
});
