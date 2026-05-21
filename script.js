//const entradaUsuario = "mm";//
//console.log(isNaN(entradaUsuario))//
//const nome = "mickey";
//const id = document.querySelector("#buscar");

//console.log(id)

//const urlString = `https://api.disneyapi.dev/character?name=${nome}`;
//const urlId = `https://api.disneyapi.dev/characters/${id}`;

//async function getUrl(url) {
    //const dados = await((await fetch(url)).json())
    //return dados;
//}
// Captura o campo de texto do HTML pelo id="buscar"
const input = document.querySelector('#buscar');

// Captura o botão do HTML
const btn = document.querySelector('button');

// Fica "escutando" o clique no botão
// o "async" permite usar o await dentro da função
btn.addEventListener('click', async (event) => {

    // Impede a página de recarregar ao clicar no botão
    event.preventDefault();

    // Pega o texto que o usuário digitou no input
    const valor = input.value;

    // isNaN verifica se o valor NÃO é um número
    // isNaN("mickey") → true  (é texto)
    // isNaN("4703")   → false (é número)
    if (isNaN(valor)) {

        // Se for texto → monta a URL com o nome
        // await pausa até o fetch terminar de buscar
        const resposta = await fetch(`https://api.disneyapi.dev/character?name=${valor}`);

        // await pausa até converter a resposta em JSON
        const dados = await resposta.json();

        // Exibe o resultado no console
        console.log(dados);

    } else {

        // Se for número → monta a URL com o ID
        const resposta = await fetch(`https://api.disneyapi.dev/characters/${valor}`);

        const dados = await resposta.json();

        console.log(dados);
    }
});
