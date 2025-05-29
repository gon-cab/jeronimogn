// script.js
const PROJECT_ID = "80k5e13a"; // ← cambia esto si tu projectId es otro
const DATASET = "production";
const API_VERSION = "2023-10-01";

const query = encodeURIComponent('*[_type == "project"]{title, description, "imageUrl": image.asset->url}');
const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${query}`;

fetch(url)
  .then(res => res.json())
  .then(({ result }) => {
    const container = document.getElementById("projects");
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
  });
