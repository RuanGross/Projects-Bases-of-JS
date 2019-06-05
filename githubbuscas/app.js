//Init github
const github = new Github();
//Init ui
const ui = new UI();

// Search User
const searchUser = document.querySelector("#searchUser");

// Search input event listener
searchUser.addEventListener("keyup", e => {
    //Get input text
    const userText = e.target.value;

    if (userText !== "") {
        // make http call
        github.getUser(userText).then(data => {
            if (data.profile.message === "Not Found") {
                //Show Alert
                ui.showAlert("Usuário não encontrado", "alert alert-danger");
            } else {
                // Show Profile
                ui.showProfile(data.profile);
                ui.showRepos(data.repos);
            }
        });
    } else {
        // Clear profile
        ui.clearProfile();
    }
});
