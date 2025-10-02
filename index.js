let APIKeySpoon = "https://api.spoonacular.com/recipes/complexSearch?query=pizza&apiKey=9a9c1b8afb5940f78a9771ca74164545"; 
let botonReceta = document.querySelector("#botonReceta");
let recetaBuscar = document.querySelector("#recetaBuscar");
let resultadoRecetas = document.querySelector("#resultadoRecetas");
botonReceta.onclick = function () {
    fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${recetaBuscar.value}&number=5&apiKey=${APIKeySpoon}`)
      .then(res => res.json())
      .then(data => {
        resultadoRecetas.innerHTML = "";
        data.results.forEach(receta => {
          resultadoRecetas.innerHTML += `
            <div class="col-md-4 mb-3">
              <div class="card shadow">
                <img src="${receta.image}" class="card-img-top rounded">
                <div class="card-body">
                  <h5 class="card-title">${receta.title}</h5>
                </div>
              </div>
            </div>
          `;
        });
      });
  };
  let botonReceta = document.querySelector("#botonReceta");
  let recetaBuscar = document.querySelector("#recetaBuscar");
  let resultadoRecetas = document.querySelector("#resultadoRecetas");

  botonReceta.onclick = function () {
    fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${recetaBuscar.value}&number=6&apiKey=${APIKeySpoon}`)
      .then(res => res.json())
      .then(data => {
        resultadoRecetas.innerHTML = "";
        data.results.forEach(receta => {
          resultadoRecetas.innerHTML += `
            <div class="col-md-4 mb-3">
              <div class="card shadow">
                <img src="${receta.image}" class="card-img-top rounded">
                <div class="card-body">
                  <h5 class="card-title">${receta.title}</h5>
                  <button class="btn btn-info mt-2" onclick="verDetalles(${receta.id})" data-bs-toggle="modal" data-bs-target="#modalDetalles">Ver detalles</button>
                </div>
              </div>
            </div>
          `;
        });
      });
  };

  // Función para traer detalles de una receta
  function verDetalles(id) {
    fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${APIKeySpoon}`)
      .then(res => res.json())
      .then(data => {
        document.querySelector("#tituloDetalle").textContent = data.title;
        document.querySelector("#imagenDetalle").src = data.image;
        document.querySelector("#ingredientesDetalle").innerHTML = data.extendedIngredients.map(i => `<li>${i.original}</li>`).join("");
        document.querySelector("#instruccionesDetalle").textContent = data.instructions || "Instrucciones no disponibles.";
      });
  }

           