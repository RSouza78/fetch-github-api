const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info"><img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
        <div class="data">
        <h1>${user.name ?? 'Não possui nome cadastrado 😢'}</h1>
        <p>${user.bio ?? 'Não possui bio cadastrada 😒'}</p>
        <div class="following-followers">
        <h3>Seguindo ${user.following}</h3>
        <h3>Seguidores ${user.followers}</h3>
        </div>
        </div>
        </div>
        `

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `<div>
            <li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>
            <div class="reaction">
<li>💡${repo.forks_count}⭐${repo.stargazers_count}👁${repo.watchers_count}👨‍💻${repo.language}</li>
            </div>
            </div>
            `)

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                <h2>Repositórios</h2>
                <ul>${repositoriesItens}</ul>
                </div>`
        }
    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Desculpe não achei 😢</h3>"
    }
}

export { screen }