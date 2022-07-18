const input = document.querySelector(".input-search");
const button = document.querySelector(".button-submit");
const divCard = document.querySelector(".card-principal");
const section = document.querySelector(".section");

button.addEventListener("click", (e) => {
  e.preventDefault();
  const userName = input.value.trim();
  userName ? getGitHubData(userName) : alert("Digite algum usuário!");

  input.value = "";
});

const getGitHubData = async (user) => {
  const url = `https://api.github.com/users/${user}`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      createCard(data);
      getRepositoryList(user, data);
    } else {
      userNotFound();
      throw new Error();
    }
  } catch (err) {
    console.error("a requisição não foi bem-sucedida", err);
  }
};

function createCard(user) {
  const { name, avatar_url, bio, public_repos, login, followers } = user;
  return (section.innerHTML = `
  <div class="card-principal">
    <img class="img-github" src="${avatar_url}" alt="minha foto do github" />
    <h2 class="name">${name}</h2>
    <h3 class="login">${login}</h3>
    <p class="bio">${bio ? bio : ""}</p>
    <div class="icones-container">
      <div class="caixa-icone-numeros">
      <img class="icone1" src="./assets/people_outline.png"/>
      <p class="public-repos">${public_repos}</p>
    </div>
    <div class="caixa-icone-numeros">
      <img class="icone2" src="./assets/Vector.png"/>
      <p class="followers">${followers}</p> 
    </div>
  </div>
  </div>
  `);
}

const getRepositoryList = async (user, data) => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${user}/repos?type=public_repo`
    );
    const userRepository = await response.json();

    userRepository.length === 0
      ? noPublicRepositorys(data.name)
      : renderRepositoryList(userRepository);
  } catch (err) {
    alert("Erro ao carregar informações");
  }
};

async function renderRepositoryList(userRepositorys) {
  console.log(userRepositorys);

  const repositorysContainer = document.createElement("div");
  repositorysContainer.className = "repositorios-container";
  section.appendChild(repositorysContainer);

  userRepositorys.map((repositorys) => {
    const { name, description, language, stargazers_count } = repositorys;

    return (repositorysContainer.innerHTML += `
        <div class="repository-card"> 
          <p class="repository-name">${name}</p>
          <p class="repository-description">${
            description === null ? "" : description
          }</p>
          <div class="repository-informations">
            <p class="repository-language">${
              language === null ? "" : language
            }</p>
            <span class="repository-stargazers-count"><img class="repository-star"src="./assets/star_border.png">${stargazers_count}</span>
           
          </div>
        </div>
        `);
  });
}

function userNotFound() {
  return (section.innerHTML = `
  <span class="not-found-container">
    <h2 class="title-not-found">Usuário não encontrado :(</h2>
    <h3 class="subtitle-not-found">Tente novamente</h3>
    <img class="img-not-found" src="./assets/not-found.svg" alt="minha foto do github" />
  </span>
  `);
}

function noPublicRepositorys(userName) {
  return (section.innerHTML += `
  <p class="repository-not-found">${userName} Não tem repositórios públicos ainda</p>
  `);
}
