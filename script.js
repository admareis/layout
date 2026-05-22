//const entradaUsuario = "mm";//
//console.log(isNaN(entradaUsuario))//
//const nome = "mickey";
//const id = document.querySelector("#buscar");

//console.log(id)

//const urlString = `https://api.disneyapi.dev/character?name=${nome}`;
//const urlId = `https://api.disneyapi.dev/characters/${id}`;

// Captura input" // 
const input = document.querySelector('#buscar');
const btn = document.querySelector('#btnEnviar');
const imagem = document.querySelector('#imagem');
const nome = document.querySelector('#nome');
const id = document.querySelector('#id');
const filmes = document.querySelector('#filmes');
const series = document.querySelector('#series');

// o "async" permite usar o await dentro da função //
btn.addEventListener('click', async (e) => {

    // Impede a página de recarregar ao clicar no botão //
    e.preventDefault();

    // Pega o texto que o usuário digitou no input //
    const valor = input.value;

    if (isNaN(valor)) {
        // monta a URL com o !NOME!//
        const resposta = await fetch(`https://api.disneyapi.dev/character?name=${valor}`);
        const dados = await resposta.json();   
        const personagem = dados.data[0]; // dados.data[0] pega o primeiro personagem da lista //
        imagem.src = personagem.imageUrl;
        nome.textContent = `Nome: ${personagem.name}`;
        id.textContent = `ID: ${personagem._id}`;
        filmes.textContent = `Filmes: ${personagem.films}`;
        series.textContent = `Séries: ${personagem.tvShows}`;

        if (personagem.films.length > 0) { // verifica se tem pelo menos um item // 
        filmes.textContent = `Filmes: ${personagem.films}`;
        } else {
        filmes.textContent = "Filmes: Nenhum filme encontrado";
        }

        if (personagem.tvShows.length > 0) {
        series.textContent = `Séries: ${personagem.tvShows}`;
        } else {
        series.textContent = "Séries: Nenhuma série encontrada";
        }

    } else {
        // ID //
        const resposta = await fetch(`https://api.disneyapi.dev/characters/${valor}`);
        const dados = await resposta.json();
        const personagem = dados.data; 
        imagem.src = personagem.imageUrl;
        nome.textContent = `Nome: ${personagem.name}`;
        id.textContent = `ID: ${personagem._id}`;
        filmes.textContent = `Filmes: ${personagem.films}`;
        series.textContent = `Séries: ${personagem.tvShows}`;

       if (personagem.films.length > 0) { //. lenght verifica 
        filmes.textContent = `Filmes: ${personagem.films}`;
        } else {
        filmes.textContent = "Filmes: Nenhum filme encontrado";
        }

        if (personagem.tvShows.length > 0) {
        series.textContent = `Séries: ${personagem.tvShows}`;
        } else {
        series.textContent = "Séries: Nenhuma série encontrada";
        }
    }
});
