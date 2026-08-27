
const filterButtons = document.querySelectorAll("[data-filter]");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    portfolioItems.forEach(item => {
      const categories = item.dataset.category.split(" ");
      const show = filter === "all" || categories.includes(filter);
      item.classList.toggle("hidden", !show);
    });
  });
});
