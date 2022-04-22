const pokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;
const gerarPokemonsPromises = () => Array(151).fill().map((_, index) =>
    fetch(pokemonUrl(index + 1)).then(resposta => resposta.json())
);
const gerarHTML = pokemons => pokemons.reduce((acumulador, {name,id,sprites,types,stats}) => {
    const tipo = types.map(tipo => tipo.type.name);
    acumulador += `
                    <div class="pokemon">
                        <div class="id">
                            <p>${id}</p>
                        </div>
                        <div class="principal">
                            <img src="${sprites.front_default}" alt="${name}">
                            <h2>${name}</h2>
                            <p>${tipo.join(" and ")}</p>
                        </div>
                        <div class="secundario">
                            <h2>Stats</h2>
                            <p>${stats[0].stat.name}: ${stats[0].base_stat}</p>
                            <p>${stats[1].stat.name}: ${stats[1].base_stat}</p>
                            <p>${stats[2].stat.name}: ${stats[2].base_stat}</p>
                        </div>
                    </div>
    `;
    return acumulador;
}, "");
const inserirHTML = pokemons => {
    const containerPokemons = document.getElementById("container-pokemons");
    containerPokemons.innerHTML += pokemons;
};
const pokemonsPromises = gerarPokemonsPromises();
Promise.all(pokemonsPromises)
    .then(gerarHTML)
    .then(inserirHTML);