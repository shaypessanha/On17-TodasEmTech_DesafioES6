const input = document.querySelector(".input");
const button = document.querySelector(".button-submit");
const divCard = document.querySelector(".card-principal");



button.addEventListener("click", (e)=> {
    e.preventDefault()
    const userName = input.value.trim()
    if(userName){
        getGitHubData(userName)
    } else {
        alert('Digite um usuário válido!')
    }
    input.value = ''
})

const getGitHubData = async (user) => {
const url = `https://api.github.com/users/${user}`;
    try {
        const response = await fetch(url)
        if(response.ok) {
            const data = await response.json()
            divCard.innerHTML = createCard(data)
        } else {
            alert("Esta usuária não existe no Github!");
            throw new Error();
        }

        // console.log(response)
        // console.log(data)
        // console.log(data.name)
    }
catch(err) {
    console.error("A requisição não foi bem sucedida", err)

    }

};

function createCard(user){
    const { name, avatar_url, bio, public_repos, login, followers} = user
    return `
    <img class="img-github "src="${avatar_url}" alt="foto perfil github" />
    <h2 class="name">name: ${name}</h2>
    <h3 class="login">login: ${login}</h3>
    <p class="bio">bio: ${bio ? bio : ' '}</p>

    <div class="caixa-icone-numeros">
        <img class="icone-1" src="../../../images/people_outLine.png"/>
        <p class="public-repos">${public_repos}</p>
    </div>
    <div class="caixa-icone-numeros">
        <img class="icone-2" src="../../../images/Vector.png"/>
        <p class="followers">${followers}</p>
    </div>

    `

}
