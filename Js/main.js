const inputSearch = document.querySelector("#input-search");
const btnSearch = document.querySelector("#btn-search");
const profileResults = document.querySelector(".profile-results");


const baseUrl = 'https://api.github.com'

async function getUser(userName) {
    const response = await fetch(`${baseUrl}/users/${userName}`)

    try{
        
        if (!response.ok) {
            throw new Error('Usuário não encontrado')
        }
        
        const data = await response.json()
        console.log(data);
        console.log(data.avatar_url)
        console.log(data.name)
        console.log(data.bio)
        console.log(data.followers)
        console.log(data.following)
            
            
        return data

    }  catch (error) {
        console.error('Erro ao buscar perfil de usuário:', error);
        alert('Usuário não encontrado')
    }
}

async function handleSearch() {
    const searchValue = inputSearch.value

    if (searchValue) {
        console.log('O valor é:', searchValue);

        const user = await getUser(searchValue)

        if (user) {
            profileResults.innerHTML = `
                <div class="profile-card">
                    <img src="${user.avatar_url}" alt="Avatar do ${user.name}" class="profile-avatar">
                    <div class="profile-info">
                        <h2>${user.name}</h2>
                        <p>${user.bio || 'Sem bio cadastrada 😢'}</p>
                    </div>
                </div>`
        }
        
    } else {
        alert('Digite um usuário no GitHub')
    }
};

btnSearch.addEventListener('click', handleSearch);


inputSearch.addEventListener('keyup', (e) => {

    if (e.key === 'Enter') {
        handleSearch();
    }
    
});
