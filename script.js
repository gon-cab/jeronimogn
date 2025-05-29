// script.js
const PROJECT_ID = "80k5e13a"; // ← cambia esto si tu projectId es otro
const DATASET = "production";
const API_VERSION = "2023-10-01";

const query = encodeURIComponent('*[_type == "project"]{title, description, "imageUrl": image.asset->url}');
const url = `https://80k5e13a.api.sanity.io/v2025-05-29/data/query/production?query=&perspective=drafts`;

fetch(url)
  .then(res => res.json())
  .then(({ result }) => {
    const container = document.getElementById("projects");
    result.forEach(project => {
      const div = document.createElement("div");
      div.className = "project";
      div.innerHTML = `
        <img src="${projectType.imageUrl}" alt="${projectType.title}" />
        <h2>${projectType.title}</h2>
        <p>${projectType.description}</p>
      `;
      container.appendChild(div);
    });
  });
