const grid = document.getElementById("grid");
let isDragging = false;
let startX, startY;
let scrollX = 0;
let scrollY = 0;

// Drag
document.querySelector(".viewport").addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX - scrollX;
  startY = e.clientY - scrollY;
  document.body.style.cursor = "grabbing";
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  document.body.style.cursor = "grab";
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  scrollX = e.clientX - startX;
  scrollY = e.clientY - startY;
  grid.style.transform = `translate(${scrollX}px, ${scrollY}px)`;
});

// Sanity fetch
const PROJECT_ID = "80k5e13a";
const DATASET = "production";
const API_VERSION = "2025-05-29";

const QUERY = encodeURIComponent(`*[_type == "project"]{title, "imageUrl": image.asset->url}`);
const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${QUERY}&perspective=published`;

fetch(url)
  .then(res => res.json())
  .then(({ result }) => {
    result.forEach(project => {
      const item = document.createElement("div");
      item.className = "grid-item";
      item.innerHTML = `<img src="${project.imageUrl}" alt="${project.title}">`;
      grid.appendChild(item);
    });
  })
  .catch(err => {
    console.error("Error al cargar los proyectos:", err);
  });
