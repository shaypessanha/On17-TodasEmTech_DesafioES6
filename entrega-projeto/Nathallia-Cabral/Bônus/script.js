const input = document.querySelector(".input");
const button = document.querySelector(".button_submit");
const divCard = document.querySelector(".card_principal");
const divError = document.querySelector(".error-card");
const reposCards = document.querySelector(".div-repos");


/* ----- FUNÇÃO DE CLICK ----- */


button.addEventListener("click", (e) => {
    e.preventDefault();
    const userName = input.value.trim();
    if (userName) {
        getGitHubData(userName);
        getRepoCards();
        
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
            getRepoCards();
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
            reposCards.innerHTML = getRepoCards(`${user}`);
            /* console.log( getRepoCards(`${user}`)) */
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
    <img class="icone1" src="./img/people_outline.png"/>
        <p class="public-repos">${public_repos}</p>
     </div>
     <div class="caixa-icone-numeros">
     <img class="icone2" src="./img/Vector.png"/>
         <p class="followers">${followers}</p> 
     </div>
   `


};

/* ----- FUNÇÃO DE CIAR REPOSITORIOS (desestruturação) ----- */

const getRepoCards = async (user) => {
    const url = `https://api.github.com/users/${user}/repos`;
    try{
        const response = await fetch(url);
        const repositories = await response.json();


        repositories.map((cards, cardsItem) => {



            const cardsRepo = document.createElement("div");
            cardsRepo.className = "cards-repos";
            reposCards.appendChild(cardsRepo);

            const titulo = document.createElement("p");
            titulo.className = "title-repo";
            titulo.innerText = `${cards.name}`;
            cardsRepo.appendChild(titulo);

        console.log("nome dos repositories",`${cards.name}`);

            const  infoRepo = document.createElement("p");
            infoRepo.className = "title-repo";
            infoRepo.innerText =  `${cards.description ? cards.description : ""}`;
            cardsRepo.appendChild(infoRepo);

            console.log("descrição dos repositories",`${cards.description}`);

            const linguagemRepo = document.createElement("div");
            linguagemRepo.className = "language-repos";
            reposCards.appendChild(linguagemRepo);

            const linguagem = document.createElement("p");
            linguagem.className =  `${cards.language}`;
            linguagem.innerText = `${cards.language ? cards.language : ""}`;
            linguagemRepo.appendChild(linguagem);

            const  forksRepo = document.createElement("p");
            forksRepo.className = "number-forks";
            forksRepo.innerText =  `${cards.forks}`;
            linguagemRepo.appendChild(forksRepo);
            
        })

    }
    catch(err){
        console.error("Esta usuária não possui repositórios", err)
    }
}



const errorCard = () => {

    divCard.remove();

    return `
    <h3 class="error-user"> Esse usúario não tem repositórios públicos ainda. </h3>
     
   `

};

