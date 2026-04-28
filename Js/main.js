const inputSearch = document.getElementById('input-search');
const btnSearch = document.getElementById('btn-search');
const profileResults = document.querySelector('.profile-results');

const baseUrl = 'https://api.github.com'

const getUser = async (userName) => {
    try {
        const response = await fetch(`${baseUrl}/users/${userName}`)
        console.log(response);


        if (!response.ok) {
            throw new Error('Ocorreu um erro na busca do usuraio')
        }

        const data = await response.json()
        return data


    } catch (error) {
        console.error('Houve um erro:', error);
    }
}

const getRepos = async (userName) => {
    try {

        const response = await fetch(`${baseUrl}/users/${userName}/repos?per_page=10&sort=created`)
        console.log(response);

        if (!response.ok) {
            throw new Error('Ocorreu um erro na busca de repositorios do usuraio')
        }

        const data = await response.json()
        return data

    } catch (error) {
        console.error('Houve um erro:', error);
    }
}

const handleSearch = async () => {
    const searchValue = inputSearch.value.trim()

    if (searchValue) {
        inputSearch.value = ''

        profileResults.innerHTML = `<div class="loading">Carregando...</div>`

        const user = await Promise.all([getUser(searchValue), getRepos(searchValue)])
        console.log(user);


        if (user) {
            profileResults.innerHTML = `
                <div class="profile-card">
                    <img src="${user.avatar_url}" alt="${user.name}" class="profile-avatar">
                    <div class="profile-info">
                        <h2>${user.name || 'Sem nome cadastrado 😞'}</h2>
                        <p>${user.bio || 'Sem bio cadastrada 😞'}</p>
                    </div>
                </div>

                <div class='profile-counter'>
                    <div class='followers'>
                        <h4>Seguidores</h4>
                        <span>${user.followers}</span>
                    </div>
                    <div class='following'>
                        <h4>Seguindo</h4>
                        <span>${user.following}</span>
                    </div>
                </div>
            `
        } else {
            profileResults.innerHTML = `<div class="error">O usuario ${searchValue} não foi encontrado 😢</div>`
        }
    } else {
        alert('Digite um usuário no GitHub')
    }

}


btnSearch.addEventListener('click', handleSearch)

inputSearch.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        handleSearch()
    }
})




