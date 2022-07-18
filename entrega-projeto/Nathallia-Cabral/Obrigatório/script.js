const input = document.querySelector(".input");
const button = document.querySelector(".button_submit");
const divCard = document.querySelector(".card_principal");
const divError = document.querySelector(".error-card")

/* ----- FUNÇÃO DE CLICK ----- */


button.addEventListener("click", (e) => {
    e.preventDefault();
    const userName = input.value.trim();
    if (userName) {
        getGitHubData(userName);
    } else {
        alert('Digite algum usuário');
        return [];
    }

    input.value = '';
});

input.addEventListener('keypress', function (event) {
    if (event.key === "Enter") {
        const userName = input.value.trim();
        if (userName) {
            getGitHubData(userName);
        } else {
            alert('Digite algum usuário');
            return [];
        }

        input.value = '';
    }



});




/* ----- FUNÇÃO DE REQUISIÇÃO DA API  ----- */


const getGitHubData = async (user) => {
    const url = `https://api.github.com/users/${user}`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            divCard.innerHTML = createCard(data);
        } else {
            divError.innerHTML = errorCard()
            throw new Error();
        }
    } catch (err) {
        console.error("a requisição não foi bem-sucedida", err);
    
    }
};



/* ----- FUNÇÃO DE CIAR CARD (desestruturação) ----- */


const createCard = (user) => {
    const {
        name,
        avatar_url,
        bio,
        login,
        public_repos,
        followers
    } = user;
    return `
    <img class="img-github" src="${avatar_url}" alt="minha foto do github" />
    <p class="name"> ${name}</p>
    <p class="login"> ${login}</p>
    <p class="bio"> ${bio ? bio : ''}</p>
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


const errorCard = () => {

    divCard.remove();

    return `
    <h3 class="error-user">Usuário não encontrado :( </h3>
        <h4 class="error-search">Pesquisa novamente!</h4>
        <img src="./img/notfound.png" class="img-error">

   `

};

