const user = {
    avatarUrl: '',
    name: '',
    bio: '',
    repositories: [],
    repo: '',
    commitEvent: '',
    forks: '',
    stars:'',
    watchers: '',
    language: '',
    setinfo(gitHubUser) {
        this.avatarUrl = gitHubUser.avatar_url
        this.name = gitHubUser.name
        this.bio = gitHubUser.bio
        this.userName = gitHubUser.login
        this.followers = gitHubUser.followers
        this.following = gitHubUser.following
    },
setRepositories(repositories){
    this.repositories = repositories
    this.forks = repositories.forks_count
    this.stars = repositories.stargazers_count
    this.watchers = repositories.watchers_count
    this.language = repositories.language
}
}

export { user }