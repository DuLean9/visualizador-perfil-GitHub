import { getUser, getRepos } from './api.js'
import { renderLoading, renderError, renderProfile } from './ui.js'

const inputSearch = document.getElementById('input-search')
const btnSearch = document.getElementById('btn-search')
const profileResults = document.querySelector('.profile-results')

const handleSearch = async () => {
    const searchValue = inputSearch.value.trim()

    if (!searchValue) {
        alert('Digite um usuário no GitHub')
        return
    }

    inputSearch.value = ''
    renderLoading(profileResults)

    const [user, repos] = await Promise.all([
        getUser(searchValue),
        getRepos(searchValue)
    ])

    if (user) {
        renderProfile(profileResults, user, repos)
    } else {
        renderError(profileResults, searchValue)
    }
}

btnSearch.addEventListener('click', handleSearch)

inputSearch.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        handleSearch()
    }
})
