const baseUrl = 'https://api.github.com'

export const getUser = async (userName) => {
    try {
        const response = await fetch(`${baseUrl}/users/${userName}`)

        if (!response.ok) {
            throw new Error('Ocorreu um erro na busca do usuário')
        }

        const data = await response.json()
        return data

    } catch (error) {
        console.error('Houve um erro:', error)
        return null
    }
}

export const getRepos = async (userName) => {
    try {
        const response = await fetch(`${baseUrl}/users/${userName}/repos?per_page=10&sort=created`)

        if (!response.ok) {
            throw new Error('Ocorreu um erro na busca de repositórios do usuário')
        }

        const data = await response.json()
        return data

    } catch (error) {
        console.error('Houve um erro:', error)
        return null
    }
}
