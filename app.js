axios.get('https://pokeapi.co/api/v2/pokedex/2/').then((data) => {
    // For loop to create li's for each pokemon

    for (let i = 0; i < data.data.pokemon_entries.length; i++) {
        const ul = document.getElementsByClassName("poke-list")[0];
        const name = data.data.pokemon_entries[i].pokemon_species.name;
        let li = document.createElement("li");
        li.classList.add(name);
        li.innerText = name;
        ul.append(li);
    }

    for (let i = 0; i < data.data.pokemon_entries.length; i++) {
        const name = data.data.pokemon_entries[i].pokemon_species.name;
        const value = data.data.pokemon_entries[i].pokemon_species.url;
        const x = document.querySelector("." + name);
        // console.log(x);
        x.addEventListener('click', function () {
            axios.get('https://pokeapi.co/api/v2/pokemon/' + name + '/')
                .then((response) => {
                    const data = response.data;
                    console.log(data);
                    let nameText = document.getElementsByClassName('pokemon-name')[0];
                    let height = document.getElementsByClassName("ability-height")[0];
                    let weight = document.getElementsByClassName("ability-weight")[0];
                    let abilityList = document.getElementsByClassName("ability-list")[0];
                    let exp = document.getElementsByClassName("ability-exp")[0];
                    let stats = document.getElementsByClassName("stat-list")[0];
                    let sprite = document.getElementsByClassName("sprite-container")[0];
                    x(data);

                    console.log(name);

                    function x(data) {
                        nameText.innerText = `${name}`;
                        height.innerText = `${data.height * 10}cm`;
                        weight.innerText = `${data.weight / 10}kg`;
                        exp.innerText = `${data.base_experience}xp`;

                        // For loop to append each ability
                        for (let ability of data.abilities) {
                            const name = ability.ability.name;
                            const li = document.createElement("li");
                            li.innerText = `${name}`;
                            li.classList.add("ability-list-item");
                            abilityList.append(li);
                        }
                        // For loop to append each base stat
                        for (let stat of data.stats) {
                            const statName = stat.stat.name;
                            const statNum = stat.base_stat;
                            const li = document.createElement("li");
                            li.innerText = `${statName}: ${statNum}`;
                            li.classList.add("stat-list-item");
                            stats.appendChild(li);
                        }
                        // Append each Poke-img
                        sprite.innerText = "";
                        const img = document.createElement("img");
                        img.src = data.sprites.front_default;
                        img.classList.add("poke-sprite");
                        const img2 = document.createElement("img");
                        img2.src = data.sprites.back_default;
                        img2.classList.add("poke-sprite");

                        sprite.appendChild(img);
                        sprite.appendChild(img2);
                    };
                });
        });
    }
    console.log(data);
});