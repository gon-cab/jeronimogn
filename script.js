const grid = document.getElementById("grid");
let isDragging = false;
let startX, startY;
let scrollX = 0;
let scrollY = 0;

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

const PROJECT_ID = "80k5e13a";
const DATASET = "production";
const API_VERSION = "2025-05-29";

const QUERY = encodeURIComponent(`*[_type == "project"]{title, "imageUrl": image.asset->url}`);
const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${QUERY}&perspective=published`;

fetch(url)
  .then(res => res.json())
  .then(({ result }) => {
    if (!result.length) return;

    const REPEAT_X = 10; // columnas
    const REPEAT_Y = 10; // filas

    for (let y = 0; y < REPEAT_Y; y++) {
      for (let x = 0; x < REPEAT_X; x++) {
        const project = result[(y * REPEAT_X + x) % result.length];
        const item = document.createElement("div");
        item.className = "grid-item";
        item.innerHTML = `<img src="${project.imageUrl}" alt="${project.title}">`;
        grid.appendChild(item);
      }
    }
  })
  .catch(err => {
    console.error("Error al cargar los proyectos:", err);
  });
