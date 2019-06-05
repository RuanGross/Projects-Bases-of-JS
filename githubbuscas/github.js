class Github {
    constructor() {
        this.client_id = "5fb245c77c8a49f497d1";
        this.client_secret = "8e64e8433eb61b2e30842e29f7697a56beb5939f";
        this.repos_count = 5;
        this.repos_sort = "created: asc";
    }

    async getUser(user) {
        const profileResponse = await fetch(
            `https://api.github.com/users/${user}?client_id=${
                this.client_id
            }&client_secret=${this.client_secret}`
        );

        const repoResponse = await fetch(
            `https://api.github.com/users/${user}/repos?per_page=${
                this.repos_count
            }&sort=${this.repos_sort}&client_id=${
                this.client_id
            }&client_secret=${this.client_secret}`
        );
        const profile = await profileResponse.json();
        const repos = await repoResponse.json();
        return {
            profile,
            repos
        };
    }
}
