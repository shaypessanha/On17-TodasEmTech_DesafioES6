let currentUserCard = null;

async function getGitDataByUsername(searchTerm) {
    let userInfoURL = `https://api.github.com/users/${searchTerm}`;
    let userInfo = await fetch(userInfoURL);
    userInfo = await userInfo.json();

    console.log(userInfo);

    if (userInfo.message == 'Not Found') {
        document.querySelector('.main-user-not-found').classList.remove('hidden');
        document.querySelector('.main-user-found').classList.add('hidden');
        return;
    }
    clearUserData();
    document.querySelector('.main-user-not-found').classList.add('hidden');
    document.querySelector('.main-user-found').classList.remove('hidden');

    setUserCard(userInfo);
}

function clearUserData() {
    if (currentUserCard != null) {
        currentUserCard.remove();
        currentUserCard = null;
    }
}

function handleSearch(event) {
    console.log(event);
    let searchTerm = event;
    console.log(searchTerm);
    getGitDataByUsername(searchTerm);
}

function setUserCard(userInfo) {
    let userCard = document.querySelector(".user-card");
    let newUserCard = document.createElement('div');
    newUserCard.className = 'user-card';
    newUserCard.innerHTML = userCard.innerHTML;
    newUserCard.innerHTML = newUserCard.innerHTML.replace('{Full Name}', userInfo.name );
    newUserCard.innerHTML = newUserCard.innerHTML.replace('{Username}', userInfo.login );
    newUserCard.innerHTML = newUserCard.innerHTML.replace('{Profile Bio}', userInfo.bio || userInfo.company );
    newUserCard.innerHTML = newUserCard.innerHTML.replace('{Followers}', userInfo.followers );
    newUserCard.innerHTML = newUserCard.innerHTML.replace('{Total Repos}', userInfo.public_repos );
    newUserCard.querySelector('.user-card > img').src = userInfo.avatar_url || 'assets/user-placeholder.svg';
    
    userCard.classList.add('hidden');
    userCard.parentElement.appendChild(newUserCard);
    currentUserCard = newUserCard;
}