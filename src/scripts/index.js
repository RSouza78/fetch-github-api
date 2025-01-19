import { getUser } from "./services/user.js"
import { getRepositories } from "./services/repositories.js"

import { user } from "./objects/user.js"
import { screen } from "./objects/screen.js"

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    if (validateEmptyInput(userName)) return
    getUserData(userName)

})

function validateEmptyInput(userName) {
    if (userName.length === 0) {
        alert('Preencha o campo com o nome do usuário do GitHub')
        return true
    }
}

document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterKeyPressed = key === 13
    if (isEnterKeyPressed) {
        if (validateEmptyInput(userName)) return
        getUserData(userName)
    }
})

async function getUserData(userName) {

    const userResponse = await getUser(userName)

    if (userResponse.message === "Not Found") {
        screen.renderNotFound()
        return
    }

    const repositoriesResponse = await getRepositories(userName)

    nameEvents(userName)
    user.setinfo(userResponse)
    user.setRepositories(repositoriesResponse)
    screen.renderUser(user)
}

async function events(userName) {
    const response = await fetch(`https://api.github.com/users/${userName}/events`)
    return await response.json()
}


function nameEvents(userName) {
    events(userName).then(eventData => {

        let pushEvents = eventData.filter(event => event.type === "PushEvent").slice(0, 3);
        let nameEventsItens = "";

        pushEvents.forEach(event => {
            let commitMessage = event.payload.commits.length > 0
                ? event.payload.commits[0].message
                : "Sem mensagem de commit";

            nameEventsItens += `
                <li class="event-item">
                    <span class="repo-name">${event.repo.name}</span>
                    <span class="commit-message">${commitMessage}</span>
                </li>`;
        });

        if (nameEventsItens) {
            document.querySelector('.profile-data').innerHTML += `
            <div class="event-box">
                <h2>Eventos</h2>
                <ul class="event-list">${nameEventsItens}</ul>
            </div>`;
        }
    });
}