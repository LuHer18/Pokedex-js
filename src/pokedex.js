const pokemonList = document.querySelector('#pokemon-list');
const btnHeader = document.querySelectorAll('.btn-header')
const API = 'https://pokeapi.co/api/v2/pokemon/';
const btnSearch = document.querySelector('.btn-search');
const input = document.querySelector('.nav-search-text')

async function fetchData(urlApi){
 const response = await fetch(urlApi);
 const data = await response.json();
 return data;
}

const pokeData = async (urlApi) => {
    try{
        for (let i = 1; i <= 151; i++) {
        let result  = await fetchData(`${urlApi}${i}`);
        showPokemon(result);
        }
    }  catch (error) {
        console.error(error)
}
}

const showPokemon = (pokemon) => {

    let types = pokemon.types.map(type => {
        return `<p class="${type.type.name} type">${type.type.name}</p>`
    }).join('');

    let pokemonId = pokemon.id.toString();
    if (pokemonId.length === 1){
        pokemonId = "00" + pokemonId;
    } else if (pokemonId.length === 2){
        pokemonId = "0" + pokemonId;
    }
   
    const div = document.createElement('div');
    div.classList.add('pokemon');
    div.innerHTML = `
    <p class="pokemon-id-back">#${pokemonId}</p>
    <figure class="img-pokemon" >   
        <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt=${pokemon.name}>
    </figure>  
    <div class="info-pokemon">
        <div class="info-name">
            <p class="pokemon-id">#${pokemonId}</p>
            <h2 class="pokemon-name">${pokemon.name} </h2>
        </div>
        <div class="type-pokemon">
            ${types}
        </div>
        <div class="pokemon-stats">
            <p class="stat">${pokemon.height}m</p>
            <p class="stat">${pokemon.weight}kg</p>
        </div>
    </div>
    `
    pokemonList.appendChild(div);
}

btnHeader.forEach(button => button.addEventListener('click', async (e)=>{
    const buttonId = e.currentTarget.id
    pokemonList.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
        let data  = await fetchData(`${API}${i}`);
        if (buttonId === "all"){
            showPokemon(data);
        } else{
        const filterType = data.types.map(type => type.type.name);
        if (filterType.some(type => type.includes(buttonId))){
        showPokemon(data);
        }
        }
    }

}))

btnSearch.addEventListener('click', async ()=>{
    let query = input.value.toLowerCase();
    pokemonList.innerHTML = "";
    for (let i = 1; i <= 151; i++) {
        let data  = await fetchData(`${API}${i}`);
        if(query === "" ){
            pokemonList.innerHTML = "Busqueda invalida";
        }else {
            if (data.name.includes(query)){
            showPokemon(data);
            }
        } 
    } 
})

pokeData(API);
