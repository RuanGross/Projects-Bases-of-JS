const http = new fastHTTP();

// http.get("https://jsonplaceholder.typicode.com/users")
//     .then(res => console.log(res))
//     .catch(err => console.log(err));

const data = {
    name: "Ruan Gross",
    username: "Ruanpg",
    email: "gross.ruan@gmail.com"
};

// http.post("https://jsonplaceholder.typicode.com/users", data)
//     .then(data => console.log(data))
//     .catch(err => console.log(err));

http.put("https://jsonplaceholder.typicode.com/users/2", data)
    .then(data => console.log(data))
    .catch(err => console.log(err));

// http.delete("https://jsonplaceholder.typicode.com/users/2")
//     .then(data => console.log(data))
//     .catch(err => console.log(err));
