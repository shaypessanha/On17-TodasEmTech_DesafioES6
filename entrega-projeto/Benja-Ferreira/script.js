const form = document.querySelector(".Form-principal");
const input = document.querySelector(".input");
const button = document.querySelector(".botao");
const divCard = document.querySelector(".card-principal");

const url = "https://api.github.com/users/BenjaFerreira";

const getGitHubData = async() => {
    try{
        const response = await fetch(url);
        console.log(response);
        const data = response.json();
        console.log(data);
    }
    catch (err){
        console.error("A requisição não foi bem-sicedida", err);

    }

};
getGitHubData();

