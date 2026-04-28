export const renderLoading = (container) => {
    container.innerHTML = `<div class="loading">Carregando...</div>`
}

export const renderError = (container, userName) => {
    container.innerHTML = `<div class="error">O usuário ${userName} não foi encontrado 😢</div>`
}

export const renderProfile = (container, user, repos) => {
    container.innerHTML = `
        <div class="profile-card">
            <img src="${user.avatar_url}" alt="${user.name}" class="profile-avatar">
            <div class="profile-info">
                <h2>${user.name || 'Sem nome cadastrado 😞'}</h2>
                <p>${user.bio || 'Sem bio cadastrada 😞'}</p>
            </div>
        </div>

        <div class='profile-counters'>
            <div class='followers'>
                <h4>Seguidores</h4>
                <span>${user.followers}</span>
            </div>
            <div class='following'>
                <h4>Seguindo</h4>
                <span>${user.following}</span>
            </div>
        </div>

        ${renderRepos(repos)}
    `
}

const renderRepos = (repos) => {
    if (!repos || repos.length === 0) {
        return '<div class="repos-empty">Nenhum repositório encontrado 😞</div>'
    }

    const reposList = repos.map(repo => `
        <li class="repo-item">
            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            <p>${repo.description || 'Sem descrição'}</p>
            <div class="repo-stats">
                <span>⭐ ${repo.stargazers_count}</span>
                <span>🍴 ${repo.forks_count}</span>
                <span>⌨️ ${repo.language}</span>
            </div>
        </li>
    `).join('')

    return `
        <div class="repos-section">
            <h3>Repositórios Recentes</h3>
            <ul class="repos-list">
                ${reposList}
            </ul>
        </div>
    `
}
