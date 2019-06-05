class UI {
    constructor() {
        this.profile = document.querySelector("#profile");
    }
    // create profile to render on screen
    showProfile(user) {
        this.profile.innerHTML = `
        <div class="card card-body mb-3">
        <div class="row">
          <div class="col-md-3">
            <img class="img-fluid mb-2" src="${user.avatar_url}">
            <a href="${
                user.html_url
            }" target="_blank" class="btn btn-primary btn-block mb-4">Ver Perfil</a>
          </div>
          <div class="col-md-9">
            <span class="badge badge-primary">Repositórios publicos: ${
                user.public_repos
            }</span>
            <span class="badge badge-secondary"> Gists públicos: ${
                user.public_gists
            }</span>
            <span class="badge badge-success">Seguidores: ${
                user.followers
            }</span>
            <span class="badge badge-info">Seguindo: ${user.following}</span>
            <br><br>
            <ul class="list-group">
              <li class="list-group-item">Empresa: ${user.company}</li>
              <li class="list-group-item">Website/Blog: ${user.blog}</li>
              <li class="list-group-item">Localização: ${user.location}</li>
              <li class="list-group-item">Membro desde: ${user.created_at}</li>
            </ul>
          </div>
        </div>
      </div>
      <h3 class="page-heading mb-3">Últimos repositórios</h3>
      <div id="repos"></div>
        `;
    }
    // Show alert message
    showAlert(message, className) {
        // Clear any alert remaining
        this.clearAlert();
        //Create a div
        const div = document.createElement("div");
        // Add class
        div.className = className;
        // Add txt
        div.appendChild(document.createTextNode(message));
        // Get parent
        const container = document.querySelector(".searchContainer");
        // Get search box
        const search = document.querySelector(".search");
        //Insert the alert
        container.insertBefore(div, search);

        //Timeout after 3 seconds
        setTimeout(() => {
            this.clearAlert();
        }, 3000);
    }

    // Clear alert message
    clearAlert() {
        const currentAlert = document.querySelector(".alert");

        if (currentAlert) {
            currentAlert.remove();
        }
    }
    // show user profile
    showRepos(repos) {
        let output = "";
        repos.forEach(function(repo) {
            output += `
            <div class="card card-body mb-2">
            <div class="row">
              <div class="col-md-6">
                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
              </div>
              <div class="col-md-6">
              <span class="badge badge-primary">Estrelas: ${
                  repo.stargazers_count
              }</span>
              <span class="badge badge-secondary">Observando: ${
                  repo.watchers_count
              }</span>
              <span class="badge badge-success">Forks: ${
                  repo.forms_count
              }</span>
              </div>
            </div>
          </div>
            `;
        });

        // Output repos
        document.querySelector("#repos").innerHTML = output;
    }
    // Clear profile
    clearProfile() {
        this.profile.innerHTML = "";
    }
}
