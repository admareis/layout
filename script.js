
const input = document.querySelector('#buscar');
const btn = document.querySelector('#btnEnviar');
const imagem = document.querySelector('#imagem');
const nome = document.querySelector('#nome');
const id = document.querySelector('#id');
const filmes = document.querySelector('#filmes');
const series = document.querySelector('#series');
const btnVoltar = document.querySelector('#btnVoltar');
const btnAvancar = document.querySelector('#btnAvancar');

let paginaAtual = 1; // começa na primeira pagina // 
let personagens = []; // guarda a lista de personagens // 
let indice = 0; // indice começa com zero // 

async function buscarPagina(pagina, nome = null) {  
    let url; // começa com null para ser preenchida pelo if e else //

    if (nome) {
        url = `https://api.disneyapi.dev/character?name=${nome}&page=${pagina}`;
    } else {
        url = `https://api.disneyapi.dev/character?page=${pagina}`;
    }

    const resposta = await fetch(url); // espera a API responder // 
    const dados = await resposta.json(); // transforma resposta em json // 
    personagens = dados.data; // guarda lista de personagens // 
    indice = 0;
    alterarPersonagem();
}
function alterarPersonagem() {
    const personagem = personagens[indice];
    imagem.src = personagem.imageUrl; // pega a URL // 
    nome.textContent = `Nome: ${personagem.name}`; // srting com o nome do personagem // 
    id.textContent = `ID: ${personagem._id}`; // srting com o nome do personagem // 
    filmes.textContent = `Filmes: ${personagem.films}`;  // mostra os filmes na tela // 
    series.textContent = `Séries: ${personagem.tvShows}`; // mostra as series na tela // 

    if (personagem.films.length > 0) { // verifica se tem pelo menos um item // 
        filmes.textContent = `Filmes: ${personagem.films}`; // retorna o nome do filme //
        } else {
        filmes.textContent = "Filmes: Nenhum filme encontrado"; 
        }

        if (personagem.tvShows.length > 0) { // verifica se tem pelo menos um item //
        series.textContent = `Séries: ${personagem.tvShows}`; // retorna a série //
        } else {
        series.textContent = "Séries: Nenhuma série encontrada";
        }
}

    btn.addEventListener('click', async (e) => { // o "async" permite usar o await dentro da função //
        
    e.preventDefault(); // Impede a página de recarregar ao clicar no botão //
    
    const valor = input.value; // Pega o texto que o usuário digitou no input //
    
    if (isNaN(valor)) {
        // monta a URL com o !NOME!//
        const resposta = await fetch(`https://api.disneyapi.dev/character?name=${valor}`);
        const dados = await resposta.json();   
        personagens = dados.data; // dados.data[0] pega o primeiro personagem da lista, data vem da API //
        indice = 0;               // para começar do primeiro personagem // 
        alterarPersonagem(); 

    } else {
        // ID //
        const resposta = await fetch(`https://api.disneyapi.dev/characters/${valor}`);
        const dados = await resposta.json();
        personagens = [dados.data]; 
        indice = 0;
        alterarPersonagem();        
    }
});

btnAvancar.addEventListener('click', () => {
    if (indice < personagens.length - 1) {
        indice++;
        alterarPersonagem();
    } else { // chegou no fim da página, busca a próxima //
        paginaAtual++;        
        buscarPagina(paginaAtual);
    }
});

btnVoltar.addEventListener('click', () => {
    if (indice > 0) {
        indice--;
        alterarPersonagem();
    } else { // chegou no início da página, busca a anterior //
            if (paginaAtual > 1) { 
            paginaAtual--;
            buscarPagina(paginaAtual);
        }
    }
});

