// script.js
const PROJECT_ID = "80k5e13a";
const DATASET = "production";
const API_VERSION = "2023-10-01";

const QUERY = encodeURIComponent(`*[_type == "project"]{title, description, "imageUrl": image.asset->url}`);
const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${QUERY}&perspective=published`;

fetch(url)
  .then(res => res.json())
  .then(({ result }) => {
    const container = document.getElementById("projects");
    if (!container) return;

    result.forEach(project => {
      const div = document.createElement("div");
      div.className = "project";
      div.innerHTML = `
        <img src="${project.imageUrl}" alt="${project.title}" />
        <h2>${project.title}</h2>
        <p>${project.description}</p>
      `;
      container.appendChild(div);
    });
  })
  .catch(err => console.error("Error al cargar proyectos:", err));
