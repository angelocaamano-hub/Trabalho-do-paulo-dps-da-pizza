const cors = require('cors');
const app = express ();

app.use(cors());
app.use(express.json());

let itens = [
    {
        nome: 'FIFA 19',
        descricao: 'Jogo de esportes',
        imagem:'https://share.google/glFkDiCwTOjN3PRLL'
    }
];

app.get('/itens', (req, res) => {
    res.json(itens);
});

app.post('/itens', (req, res) => {
    const novoItem = req.body;
    itens.push(novoItem);
    res.status(201).send("Item adicionado!");
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});



const lista = document.querySelector('ol'); // ou o seletor que você usou

// Função para pegar os itens do servidor (GET)
async function carregarItens() {
    const resposta = await fetch('http://localhost:3000/itens');
    const dados = await resposta.json();
    
    lista.innerHTML = ""; // limpa a lista antes de carregar
    
    dados.forEach(item => {
        lista.innerHTML += `
            <li>
                <h3>${item.nome}</h3>
                <img src="${item.imagem}">
                <p>${item.descricao}</p>
                <span class="preço">R$ 99,00</span>
            </li>
        `;
    });
}

// Onde a lista vai aparecer
const listaOndeFicamOsJogos = document.querySelector('ol');

// 1. Função que busca os jogos do servidor (GET)
async function carregarItens() {
    try {
        const resposta = await fetch('http://localhost:3000/itens');
        const dados = await resposta.json();

        // Limpa a lista pra não duplicar tudo toda hora
        listaOndeFicamOsJogos.innerHTML = "";

        // Desenha cada jogo na tela
        dados.forEach(jogo => {
            listaOndeFicamOsJogos.innerHTML += `
                <li>
                    <h3>${jogo.nome}</h3>
                    <img src="${jogo.imagem}" alt="foto do jogo">
                    <p>${jogo.descricao}</p>
                    <span class="preço">R$ 150,00</span>
                </li>
            `;
        });
    } catch (erro) {
        console.log("Ih, o servidor tá desligado ou deu erro:", erro);
    }
}

// 2. Função que manda o jogo novo pro servidor (POST)
async function adicionar() {
    const campoNome = document.getElementById('nome').value;
    const campoDesc = document.getElementById('desc').value;
    const campoUrl = document.getElementById('url').value;

    // Objeto com os dados do jogo
    const novoJogo = {
        nome: campoNome,
        descricao: campoDesc,
        imagem: campoUrl
    };

    // Manda pro servidor
    await fetch('http://localhost:3000/itens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoJogo)
    });

    // Limpa os campos do formulário pro professor ver que funcionou
    document.getElementById('nome').value = "";
    document.getElementById('desc').value = "";
    document.getElementById('url').value = "";

    // Atualiza a lista na hora pra mostrar o jogo novo
    carregarItens();
}

// Chama a função assim que a página abre
carregarItens();