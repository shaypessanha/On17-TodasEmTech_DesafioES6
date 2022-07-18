let layoutTemplates = {};
let elementsToClear = [];

function init() {
    layoutTemplates = {
        user_repo_card: document.querySelector(".repo-card-template").content.firstElementChild,
        user_card: document.querySelector(".user-card-template").content.firstElementChild
    };
    console.log(layoutTemplates.user_repo_card);
}

init();

async function getGitDataByUsername(searchTerm) {
    let userInfoURL = `https://api.github.com/users/${searchTerm}`;
    let userRepoURL = `https://api.github.com/users/${searchTerm}/repos`;
    let userInfo = await fetch(userInfoURL);
    userInfo = await userInfo.json();
    console.log(userInfo.message === 'Not Found');
    if (userInfo?.message == 'Not Found') {
        document.querySelector('.main-user-not-found').classList.remove('hidden');
        return;
    }
    clearUserData();
    elementsToClear = [];
    document.querySelector('.main-user-not-found').classList.add('hidden');
    
    let userRepoList = await fetch(userRepoURL);
    userRepoList = await userRepoList.json();

    console.log(userRepoList);

    setRepoList(userRepoList, userInfo);
    setUserCard(userInfo);
}

function clearUserData() {
    for (let item of elementsToClear) {
        item.parentElement.removeChild(item);
    }
}

function handleSearch(event) {
    console.log(event);
    let searchTerm = event;
    console.log(searchTerm);
    getGitDataByUsername(searchTerm);
}

function setUserCard(userInfo) {
    let regex = /\{.*\}/g;
    let mainUserRepos = document.querySelector(".main-user-repos");

    let newUserCard = document.createElement("div");
    newUserCard.className = "user-card";
    newUserCard.innerHTML = layoutTemplates.user_card.innerHTML;
    let replaceTerms = Array.from(newUserCard.innerHTML.matchAll(regex));
    let [userName, userUser, userDesc, userFollowers, userRepoCount] = replaceTerms;
    newUserCard.innerHTML = newUserCard.innerHTML.replace(userName[0], userInfo.name );
    newUserCard.innerHTML = newUserCard.innerHTML.replace(userUser[0], userInfo.login );
    newUserCard.innerHTML = newUserCard.innerHTML.replace(userDesc[0], userInfo.bio || userInfo.company );
    newUserCard.innerHTML = newUserCard.innerHTML.replace(userFollowers[0], userInfo.followers );
    newUserCard.innerHTML = newUserCard.innerHTML.replace(userRepoCount[0], userInfo.public_repos );
    newUserCard.querySelector('.user-card > img').src = userInfo.avatar_url || 'assets/user-placeholder.svg';
    mainUserRepos.prepend(newUserCard);
    elementsToClear.push(newUserCard);
}

function setRepoList(userRepoList, userInfo) {
    let regex = /\{.*\}/g;
    let repoCardList = document.querySelector(".main-user-repos > .repo-card-list");
    let mainUserRepos = document.querySelector(".main-user-repos");
    let repoUserCard = document.querySelector(".main-user-repos > .user-card");
    let repoCardTemplate = layoutTemplates.user_repo_card;

    if (userRepoList.length == 0) {
        let noReposDiv = document.createElement('div');
        noReposDiv.className = 'repo-list-empty';
        repoCardList.classList.add('hidden');
        repoCardList.parentElement.appendChild(noReposDiv);
        noReposDiv.innerHTML = `
        <p>${userInfo.name} não tem repositórios públicos ainda.</p>
        `;
        elementsToClear.push(noReposDiv);
        return;
    }
    repoCardList.classList.remove('hidden');
    for (let repo of userRepoList) {
        let newCard = document.createElement("div");
        newCard.className = "repo-card";
        newCard.innerHTML = repoCardTemplate.innerHTML;
        let replaceTerms = Array.from(newCard.innerHTML.matchAll(regex));
        let [repoName, repoDesc, repoLang, repoFavs] = replaceTerms;
        newCard.innerHTML = newCard.innerHTML.replace(repoName[0], repo.name );
        newCard.innerHTML = newCard.innerHTML.replace(repoDesc[0], repo.description || repo.git_url);
        newCard.innerHTML = newCard.innerHTML.replace(repoLang[0], repo.language || 'Other' );
        newCard.innerHTML = newCard.innerHTML.replace(repoFavs[0], repo.stargazers_count );
        repoCardList.appendChild(newCard);
        elementsToClear.push(newCard);
    }
}