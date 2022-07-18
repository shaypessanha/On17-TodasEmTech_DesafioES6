const input = document.querySelector(".input");
const button = document.querySelector(".button-submit");
const divCard = document.querySelector(".card-principal");
const naoEncontrado = document.createElement('p');
naoEncontrado.setAttribute('class', 'erro-p');
const reposDiv = document.getElementById("div-repos");
const repoNaoEncontrado = document.createElement('p');
repoNaoEncontrado.setAttribute('class', 'semRepos');


button.addEventListener("click", (e) => {
    e.preventDefault();
    const userName = input.value.trim();
    if (userName) {
        getGitHubData(userName);
    } else {
        alert('Digite algum usuário!');
    }
    input.value = ''; //limpar o input depois de executar a pesquisa
});


const getGitHubData = async (user) => {
    const url = `https://api.github.com/users/${user}`;
    try {
        const response = await fetch(url);
        if(response.ok){
            const data = await response.json();
            divCard.innerHTML = createCard(data);
        } else{
            naoEncontrado.innerText = ("Usuário não encontrado :(");
            divCard.appendChild(naoEncontrado);
            throw new Error();
        }
    }
    catch (err) {
        console.error("a requisição não foi bem-sucedida", err);
    }
};

function createCard(user){
    const { name, avatar_url, bio, public_repos, login, followers } = user;
    return `
    <img class="img-github" src="${avatar_url}" alt="foto do usuário do github" />
    <h2 class="name" >name: ${name}</h2>
    <h3 class="login" >login: ${login}</h3>
    <p class="bio" >bio: ${bio ? bio : ''}</p>

    <div class="caixa-iconne-numeros">
        <img class="icone1" src="../../../images/people_outline.png"/>
        <p class="public_repos" >public repos: ${public_repos}</p>
    </div>

    <div class="caixa-iconne-numeros"> 
        <img class="icone2" src="../../../images/Vector.png"/>
        <p class="followers"${followers}</p> 
    </div>
    `
};

/*
Fase 2 - Extra
 Exibir todos repositórios do usuário, com as informações:
Titulo
Descrição
Linguagem utilizada
Total de estrelas
 O usuário deve receber um alerta caso usuário não tenha repositórios públicos*/


//A API não está funcionando, acho que caiu. Então, coloquei como acredito que funcionaria, já que não consigo testar.
/*
const createListRepos = async(user) => {
    const urlRepos = `https://api.github.com/users/${user}/repos`;
    try {
        const urlData = await fetch(urlRepos);
        if (urlData.ok) {
            const exibirData = await urlData.json();
            exibirData.map(listRepos)
            const {title, description, language, stars} = public_repos;
            return `
            <h1 class="titulo-repos" >name: ${}.listrepos </h2>
            <h2 class="descricao" >name: ${}</h2>
            <h3 class="linguagem" >login: ${}</h3>
            <p class="estrelas" >bio: ${ ?  : ''}</p>
            `
        } else{
            repoNaoEncontrado.innerText = ("Usuário não encontrado :(");
            reposDiv.appendChild(repoNaoEncontrado);
            throw new Error();
        }
        
        } 
        catch (err) {
            console.error("a requisição não foi bem-sucedida", err);
          
        }
        
    }


*/





