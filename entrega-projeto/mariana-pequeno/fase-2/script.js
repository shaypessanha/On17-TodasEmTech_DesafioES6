//https://api.github.com/users/${user}

const input = document.querySelector(".input");
const button = document.querySelector(".btn");
const containerCard = document.querySelector(".container-card");

const card1 = document.querySelector(".card-1");
const imgGithubUser = document.querySelector(".img-github");
const nameUser = document.querySelector(".name");
const loginUser = document.querySelector(".login");
const bioUser = document.querySelector(".bio");
const publicReposUser = document.querySelector(".public-repos");
const followersUser = document.querySelector(".followers");

const cardRepo = document.querySelector(".card-repos");
const card2 = document.querySelector(".card-2");
const title2 = document.querySelector(".title-2");
const pSearch = document.querySelector(".paragraph-search");

const notFoundRepos = document.querySelector(".not-found-repos");
const pNotRepos = document.querySelector(".p-not-repos");

button.addEventListener("click", (e) => {
  e.preventDefault();
  const userName = input.value.trim();
  if (userName) {
    getGitHubData(userName);
    createReposList(userName)
  } else {
    alert("Digite algum usuário!");
  }
  input.value = "";
});

const getGitHubData = async (user) => {
  const url = `https://api.github.com/users/${user}`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      card1.classList.replace("inativo", "ativo");
      card2.classList.replace("ativo", "inativo");
      creatElements(data);
    } else { //user not found test: @0545mml
      // alert("esta usuária não existe no github!");
      card1.classList.replace("ativo", "inativo");
      card2.classList.replace("inativo","ativo");
      throw new Error(); 
    }
  } catch (err) {
    console.error("a requisição não foi bem-sucedida", err);
  }
}

function creatElements(user){
  const { name, avatar_url, bio, public_repos, login, followers } = user;
  imgGithubUser.src = `${avatar_url}`;
  nameUser.innerText = `${name ? name : ""}`;
  loginUser.innerText = `${login}`;
  bioUser.innerText = `${bio ? bio : ""}`;
  publicReposUser.innerText = `${public_repos}`;
  followersUser.innerText = `${followers}`;
}

//FASE 2
const createReposList = async (user) => {
  const urlRepos = `https://api.github.com/users/${user}/repos`;
  try{
    const responseRepo = await fetch(urlRepos);
    if(responseRepo.ok){
      const dataRepos = await responseRepo.json();
      cardRepo.classList.replace("inativo", "ativo");
      card2.classList.replace("ativo", "inativo");
      notFoundRepos.classList.replace("ativo", "inativo");
      cardRepos(dataRepos);
    }else{ //User not repos: @Raptor117spect
      cardRepo.classList.replace("ativo", "inativo");
      card2.classList.replace("inativo","ativo");
      notFoundRepos.classList.replace("inativo","ativo");
      throw new Error(); 
    }
  } catch(e){
    console.error(e)
  }
};

function cardRepos(user){
  user.map(item => {
    const repos = document.createElement("div");
    cardRepo.appendChild(repos);
    repos.classList.add("repos");
    const titleRepos = document.createElement("h2");
    repos.appendChild(titleRepos);
    titleRepos.classList.add("name-repos");
    const descriptionRepos = document.createElement("p");
    repos.appendChild(descriptionRepos);
    descriptionRepos.classList.add("description-repos");
    const spansTags = document.createElement("div");
    repos.appendChild(spansTags);
    spansTags.classList.add("spans-tags");
    const language = document.createElement("span");
    spansTags.appendChild(language);
    language.classList.add("language");
    const stars = document.createElement("span");
    spansTags.appendChild(stars);
    stars.classList.add("stars");

    titleRepos.innerText = item.name;
    descriptionRepos.innerText = item.description;
    language.innerText = item.language;
    stars.innerText = item.stargazers_count;
  })
}