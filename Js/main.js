const inputSearch = document.querySelector("#input-search");
const btnSearch = document.querySelector("#btn-search");
const profileResults = document.querySelector(".profile-results");


const baseUrl = 'https://api.github.com'

async function getUser(userName) {
    
    try{
        const response = await fetch(`${baseUrl}/users/${userName}`)
        
        if (!response.ok) {
            throw new Error('Ocorreu um erro ao buscar o usuário')
        }
        
        const data = await response.json()
          
        return data

    }  catch (error) {
        console.error('Erro ao buscar perfil de usuário:', error);
        return 'error'
    }
}

async function handleSearch() {
    const searchValue = inputSearch.value.trim()

    if (searchValue) {
        profileResults.innerHTML = `<div class="loading">Carregando...</div>`


        const user = await getUser(searchValue)

        if (user === 'error') {
            profileResults.innerHTML = `<div class="error">O usuário ${searchValue} não foi encontrado</div>`
        } else {
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
