let APIKeySpoon = "9a9c1b8afb5940f78a9771ca74164545";

let botonReceta = document.querySelector("#botonReceta");
let recetaBuscar = document.querySelector("#recetaBuscar");
let resultadoRecetas = document.querySelector("#resultadoRecetas");

botonReceta.onclick = function () {
    let query = recetaBuscar.value.trim();
    if (!query) {
        alert("Ingresa el nombre de una receta");
        return;
    }

    fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=6&apiKey=${APIKeySpoon}`)
        .then(res => res.json())
        .then(data => {
            resultadoRecetas.innerHTML = "";
            if (!data.results || data.results.length === 0) {
                resultadoRecetas.innerHTML = "<p>No se encontraron recetas.</p>";
                return;
            }

            data.results.forEach(receta => {
                let card = document.createElement("div");
                card.className = "col-md-4 mb-3";
                card.innerHTML = `
                    <div class="card shadow">
                        <img src="${receta.image}" class="card-img-top rounded">
                        <div class="card-body">
                            <h5 class="card-title">${receta.title}</h5>
                            <button class="btn btn-info mt-2" data-bs-toggle="modal" data-bs-target="#modalDetalles">Ver detalles</button>
                        </div>
                    </div>
                `;

                card.querySelector("button").onclick = function() {
                    verDetalles(receta.id);
                }
                resultadoRecetas.appendChild(card);
            });
        })
        .catch(err => console.error("Error al buscar recetas:", err));
}

function verDetalles(id) {
    fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${APIKeySpoon}`)
        .then(res => res.json())
        .then(data => {
            document.querySelector("#tituloDetalle").textContent = data.title;
            document.querySelector("#imagenDetalle").src = data.image;
            document.querySelector("#ingredientesDetalle").innerHTML = data.extendedIngredients
                .map(i => `<li>${i.original}</li>`).join("");
            document.querySelector("#instruccionesDetalle").textContent = data.instructions || "Instrucciones no disponibles.";
        })
        .catch(err => console.error("Error al cargar detalles:", err));
}

let botonIntolerancias = document.querySelector("#botonIntolerancias");
let intoleranciasBuscar = document.querySelector("#intoleranciasBuscar");
let resultadoIntolerancias = document.querySelector("#resultadoIntolerancias");

let botonIngredientes = document.querySelector("#botonIngredientes");
let ingredientesBuscar = document.querySelector("#ingredientesBuscar");
let resultadoIngredientes = document.querySelector("#resultadoIngredientes");

function verDetalles(id) {
    fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${APIKeySpoon}&includeNutrition=true`)
        .then(res => res.json())
        .then(data => {
            document.querySelector("#tituloDetalle").textContent = data.title;
            document.querySelector("#imagenDetalle").src = data.image;

            document.querySelector("#ingredientesDetalle").innerHTML =
                data.extendedIngredients.map(i => `<li>${i.original}</li>`).join("");

            document.querySelector("#instruccionesDetalle").textContent = data.instructions || "Instrucciones no disponibles.";

            if (data.nutrition && data.nutrition.nutrients) {
                document.querySelector("#nutricionDetalle").innerHTML =
                    data.nutrition.nutrients.map(n => `<li>${n.name}: ${n.amount} ${n.unit}</li>`).join("");
            } else {
                document.querySelector("#nutricionDetalle").innerHTML = "<li>No disponible</li>";
            }
        })
        .catch(err => console.error(err));
}

botonIntolerancias.onclick = function() {
    let intolerancias = intoleranciasBuscar.value.trim();
    if (!intolerancias) return alert("Ingresa al menos una intolerancia");

    fetch(`https://api.spoonacular.com/recipes/complexSearch?intolerances=${intolerancias}&number=6&apiKey=${APIKeySpoon}`)
        .then(res => res.json())
        .then(data => {
            resultadoIntolerancias.innerHTML = "";
            if (!data.results || data.results.length === 0) {
                resultadoIntolerancias.innerHTML = "<p>No se encontraron recetas.</p>";
                return;
            }

            data.results.forEach(receta => {
                let card = document.createElement("div");
                card.className = "col-md-4 mb-3";
                card.innerHTML = `
                    <div class="card shadow">
                        <img src="${receta.image}" class="card-img-top rounded">
                        <div class="card-body">
                            <h5 class="card-title">${receta.title}</h5>
                            <button class="btn btn-info mt-2" data-bs-toggle="modal" data-bs-target="#modalDetalles">Ver detalles</button>
                        </div>
                    </div>
                `;
                card.querySelector("button").onclick = function() { verDetalles(receta.id); };
                resultadoIntolerancias.appendChild(card);
            });
        })
        .catch(err => console.error(err));
}

botonIngredientes.onclick = function() {
    let ingredientes = ingredientesBuscar.value.trim();
    if (!ingredientes) return alert("Ingresa al menos un ingrediente");

    fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientes}&number=6&apiKey=${APIKeySpoon}`)
        .then(res => res.json())
        .then(data => {
            resultadoIngredientes.innerHTML = "";
            data.forEach(receta => {
                let card = document.createElement("div");
                card.className = "col-md-4 mb-3";
                card.innerHTML = `
                    <div class="card shadow">
                        <img src="${receta.image}" class="card-img-top rounded">
                        <div class="card-body">
                            <h5 class="card-title">${receta.title}</h5>
                            <button class="btn btn-info mt-2" data-bs-toggle="modal" data-bs-target="#modalDetalles">Ver detalles</button>
                        </div>
                    </div>
                `;
                card.querySelector("button").onclick = function() { verDetalles(receta.id); };
                resultadoIngredientes.appendChild(card);
            });
        })
        .catch(err => console.error(err));
}

           