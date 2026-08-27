/*
=========================================
PORTFOLIO FILTER SYSTEM

HOW TO USE TAGS:

data-tags="illustration"
data-tags="game animation"
data-tags="game illustration 3d"

The script automatically:
1. Creates visible hashtags
2. Filters cards when category buttons are clicked
=========================================
*/

const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioCards = document.querySelectorAll(".portfolio-card");
const emptyState = document.getElementById("emptyState");


/* Convert data-tags into visible hashtags */
portfolioCards.forEach((card) => {
  const tagContainer = card.querySelector(".portfolio-tags");
  const tags = (card.dataset.tags || "")
    .split(/\s+/)
    .filter(Boolean);

  tags.forEach((tag) => {
    const hashtag = document.createElement("span");
    hashtag.className = "portfolio-tag";
    hashtag.textContent = "#" + tag.toUpperCase();
    tagContainer.appendChild(hashtag);
  });
});


/* Image fallback:
   If the image file does not exist yet,
   hide the broken image and show the placeholder.
*/
document.querySelectorAll(".portfolio-image img").forEach((image) => {
  image.addEventListener("error", () => {
    image.style.display = "none";
  });
});


/* Filter function */
function filterPortfolio(selectedFilter) {
  let visibleItems = 0;

  portfolioCards.forEach((card) => {
    const tags = (card.dataset.tags || "")
      .split(/\s+/)
      .filter(Boolean);

    const shouldShow =
      selectedFilter === "all" ||
      tags.includes(selectedFilter);

    card.classList.toggle("hidden", !shouldShow);

    if (shouldShow) visibleItems++;
  });

  emptyState.classList.toggle("show", visibleItems === 0);
}


/* Button interaction */
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");
    filterPortfolio(selectedFilter);
  });
});
