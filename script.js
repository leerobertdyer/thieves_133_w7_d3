const mainDiv = document.createElement('div')
mainDiv.className = 'mainDiv'
document.body.append(mainDiv)

const form = document.createElement('form')
mainDiv.append(form)

const pokemonInput = document.createElement('input')
pokemonInput.type = 'text'
pokemonInput.placeholder = 'eg charizard... '
form.append(pokemonInput)

const submit = document.createElement('input')
submit.type = 'submit'
submit.value = 'Find Pokemon!'
submit.className = 'submit'
form.append(submit);

form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(pokemonInput.value)
    fetchPokemon(pokemonInput.value)})

const cardContainer = document.createElement('div')
cardContainer.className = 'cardContainer'
mainDiv.append(cardContainer)    

const fetchPokemon = async (poke) => {
    console.log('made it here')
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`);
    if (resp.ok) {
        const data = await resp.json();
        const pokemon = {
            name: data.name,
            sprite: data.sprites.other['official-artwork'].front_default,
            abilities: data.abilities
        }
        const card = document.createElement('div');
        card.className = "card";
        cardContainer.append(card);

        const title = document.createElement('h1');
        title.className = 'pokemonName';
        title.innerText = pokemon.name;
        card.append(title);

        const sprite = document.createElement('img');
        sprite.src = pokemon.sprite;
        sprite.className = 'sprite';
        card.append(sprite)

        const abilitiesContainer = document.createElement('div');
        abilitiesContainer.className = 'abilitiesContainer';
        card.append(abilitiesContainer)

        const a = document.createElement('h2');
        a.innerText = "Abilities";
        card.append(a);

        const abilities = document.createElement('ul');
        card.append(abilities);
        for (abil of pokemon.abilities) {
            const li = document.createElement('li');
            li.innerText = abil.ability.name;
            abilities.append(li)
        }

    }
    else {
        console.log('pokemon not found...');
        return "Not Found";
    }
}


