// script.js
const PROJECT_ID = "80k5e13a";
const DATASET = "production";
const API_VERSION = "2023-10-01";

const QUERY = encodeURIComponent(`*[_type == "project"]{title, description, "imageUrl": image.asset->url}`);
const url = 'https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${QUERY}&perspective=published';

fetch(https://80k5e13a.api.sanity.io/v2025-05-29/data/query/production?query=*%5B_type+%3D%3D+%22project%22%5D%7B%0A++title%2C%0A++description%2C%0A++%22imageUrl%22%3A+image.asset-%3Eurl%0A%7D&perspective=published)
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
