[12:15 AM, 25/05/2026] Adma Reis: async function buscarPagina(pagina, nome = null) {  
    try {
        let url;

        if (nome) {
            url = https://api.disneyapi.dev/character?name=${nome}&page=${pagina};
        } else {
            url = https://api.disneyapi.dev/character?page=${pagina};
        }

        const resposta = await fetch(url);
        const dados = await resposta.json();
        personagens = dados.data;
        indice = 0;
        alterarPersonagem();
    } catch (erro) {
        console.error("Erro ao buscar página:", erro);
        alert("Erro ao buscar personagens. Tente novamente.");
    }
}
[12:15 AM, 25/05/2026] Adma Reis: btn.addEventListener('click', async (e) => {
    e.preventDefault();
    const valor = input.value;

    try {
        if (isNaN(valor)) {
            const resposta = await fetch(https://api.disneyapi.dev/character?name=${valor});
            const dados = await resposta.json();   
            personagens = dados.data;
            indice = 0;
            alterarPersonagem(); 
        } else {
            const resposta = await fetch(https://api.disneyapi.dev/characters/${valor});
            const dados = await resposta.json();
            personagens = [dados.data]; 
            indice = 0;
            alterarPersonagem();        
        }
    } catch (erro) {
        console.error("Erro na busca:", erro);
        alert("Personagem não encontrado ou erro na conexão.");
    }
});
[12:16 AM, 25/05/2026] Adma Reis: function alterarPersonagem() {
    try {
        const personagem = personagens[indice];
        
        if (!personagem) {
            alert("Nenhum personagem encontrado.");
            return;
        }

        imagem.src = personagem.imageUrl;
        nome.textContent = Nome: ${personagem.name};
        id.textContent = ID: ${personagem._id};
        // ... resto do código
    } catch (erro) {
        console.error("Erro ao exibir personagem:", erro);
    }
}