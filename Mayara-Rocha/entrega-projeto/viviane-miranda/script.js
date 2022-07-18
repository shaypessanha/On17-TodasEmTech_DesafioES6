const input = document.querySelector('.input');
const button = document.querySelector('.button-submit');
const divCard = document.querySelector('.card-main');
const sectionCard = document.querySelector('.cards');
let imagem = document.createElement('img');
let notFoundText = document.createElement('h1');
const repository = document.querySelector('.repos');



button.addEventListener('click', (e) => {
  e.preventDefault();
  const userName = input.value.trim();
  if (userName) {
    getGithubData(userName);
    getGithubRepos(userName);
  } else {
    alert('Digite algum usuário!');
  }
  input.value = '';
});



const getGithubData = async(user) => {

  const url = `https://api.github.com/users/${user}`;

  try {
    const response = await fetch(url);
    if (response.ok){
    const data = await response.json();
    divCard.innerHTML = creatCard(data);
    } else {
      divCard.style.display = "none";
      notFoundText.innerText = "Usuário não encontado!"
      sectionCard.appendChild(notFoundText)
      imagem.setAttribute('src', '/Mayara-Rocha/images/notfound.png');
      sectionCard.appendChild(imagem)
        throw new Error()
      
      }
     
  }
  catch (error) {
    alert("Usuário não encontrado!", error);
  }

};


function creatCard(user){
  const {name, avatar_url, bio, public_repos, login, followers} = user;
  return `
  <img class="img-github" src="${avatar_url ? avatar_url : ''}" alt="foto do usuario">
  <h2 class="name">${name}</h2>
  <h3 class="login">${login ? login: ''}<h3>
  <p class="bio">${bio ? bio: ''}</p>
  <div class="box-icon">
    <img class="icone" src="/Mayara-Rocha/images/Vector.png">
    <p class="public_repos">${public_repos}</p>
  
    <img class="icone" src="/Mayara-Rocha/images/people_outline.png">
    <p class="followers">${followers}</p>
  </div>

  `
};


const getGithubRepos = async(user) => {
  const url = `https://api.github.com/users/${user}/repos`;

  try{
    const response = await fetch(url);
    if (response.ok){
        const data = await response.json();
        repository.innerHTML = data.map(repo =>{
         return creatRepos(repo)
          
        }).join("");//remove as vírgulas do map

       // 

    } else{
      repository.style.display = "none";
        throw new Error()
    }
  
    
  }
  catch (error) {
    alert('Repositório não encontrado.', error)
  }
}


function creatRepos(user){
  const {stargazers_count,name,language,description} = user;
  return (
  `<div class="repository">
  <h2>${name}</h2>
  <h4>${description || ""}</h4>
  <div  class="box-icon" >
  <p>${language || ""}</p>
  <p>⭐${stargazers_count || ""}</p>
  </div>
  </div>`)

};



