const input = document.querySelector(".input");
const button = document.querySelector(".button-submit");
const divCard = document.querySelector(".card-principal");


button.addEventListener("click", (e) => {
    e.preventDefault();
    const userName = input.value.trim();
    if (userName) {
        getGitHubData(userName);
    } else {
        alert('Digite algum usuário!');
    }
    input.value = '';
});


const getGitHubData = async (user) => {
    const url = `https://api.github.com/users/${user}`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            divCard.innerHTML = createCard(data);
            //chamar aqui a funcao createRepo, utilizando a mesma logica
        } else {
            alert("s");
            throw new Error();
        }
    }
    catch (err) {
        console.error("a requisição não foi bem-sucedida", err);
    }
};

function createCard(user) {
    const { name, avatar_url, bio, public_repos, login, followers } = user;
    return `
    <img class="img-github" src="${avatar_url}" alt="minha foto do github" />
    <h2 class="name">name: ${name}</h2>
    <h3 class="login">login: ${login}</h3>
    <p class="bio">bio: ${bio ? bio : ''}</p>
    <div class="caixa-icone-numeros">
        <img class="icone1" src="../../images/people_outline.png"/>
        <p class="public-repos">${public_repos}</p>
     </div>
     <div class="caixa-icone-numeros">
        <img class="icone2" src="../../images/Vector.png"/>
         <p class="followers">${followers}</p> 
     </div>
   `
};


//PARTE 2 - COLINHA DA AMADA PROF


const createReposList = async(user) => {

    const urlRepos = `https://api.github.com/users/${user}/repos`;
    //fetch//
    //then//
    //tratamento de erros
    //map
    //para cada item dessa arrayzona de repos que a API me retorna, eu preciso criar um card que tenha x caracteristicas
    // e posso usar tambem o destructure const{ name, stargazes_count, etc} = data
}