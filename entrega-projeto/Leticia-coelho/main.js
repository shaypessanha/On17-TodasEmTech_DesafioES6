const input = document.querySelector(".input");
const btn = document.querySelector(".button-submit");
const divCard = document.querySelector(".card-principal");

btn.addEventListener("click", (e) =>{
    e.preventDefault();
    const UserName = input.value.trim();
    if(UserName){
        getGiHubData(UserName);
    }else {
        alert("Digite um usuário");
    }
    input.value = "";
});

const getGiHubData = async(user) =>{
    const url = `https://api.github.com/users/${user}`;
    try{
        const response = await fetch(url);
        if(response.ok){
            const data = await response.json();
            divCard.innerHTML = createCard(data);
        }else{
            alert("esta usuária não existe");
            throw new Error();
        }
    }
    catch(err){
        console.log("requisição não sucedida", err);
    }
};

function createCard(user){
    const{ name, avatar_url, bio, public_repos, login, followers} = user;
    return`
    <img class="img-git" src="${avatar_url}" alt="foto user"/>
    <h2 class="name"> ${name}</h2>
    <p class="login">${login}</p>
    <p class="bio">${bio}</p>
    <div class="icones">
    <button class="btn-icon" id="repos"><img class="icone1"; src="../../images/people_outline.png"/></button>
    <p class="public-repos">${public_repos}</p>
    <button class="btn-icon"><img class="icone2"; src="../../images/Vector.png"/></button>
    <p class="followers">${followers}</p>`;

    const btnIcon = document.getElementById("repos");

    btnIcon.addEventListener("click", (e) =>{
        e.preventDefault();
        getGithubRepos(login);
        
    });
};

const getGithubRepos = async(login) => {
    const url = `https://api.github.com/users/${login}/repos`;
  
    try{
      const response = await fetch(url);
      if (response.ok){
          const data = await response.json();
          divCard.innerHTML = data.map(repo =>{
           return creatRepos(repo)
            
          }).join("");
  
          
  
      } else{
        divCard.style.display = "none";
          throw new Error()
      }
    
      
    }
    catch (error) {
      alert('Repositório não encontrado.', error)
    }
  }

  function creatRepos(login){
    const {stargazers_count,name,language,description} = login;
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