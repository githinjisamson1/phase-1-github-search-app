function reposInfo(data) {
  const reposList = document.querySelector("#repos-list");

  data.forEach((repo) => {
    const liRepo = document.createElement("li");
    liRepo.textContent = repo.name;
    liRepo.style.borderBottom = "1px solid #ccc";
    reposList.appendChild(liRepo);
  });
}

function displayUserInformation(data) {
  const userList = document.querySelector("#user-list");

  data.items.forEach((item) => {
    const liUser = document.createElement("li");
    liUser.innerHTML = `
            <div>
            <img src="${item.avatar_url}" style="height: 40px; width: 40px; border-radius: 50%"/>
            </div>
            <h5>${item.login}</h5>
            <div>
            <a href="${item.url}">Link to profile</a>
            </div>
            `;

    userList.appendChild(liUser);

    // handle clicking user
    liUser.querySelector("h5").addEventListener("click", function (e) {
      // fetch API - all/[]
      // item.login caters for scope issues/cannot access inputValue

      fetch(`https://api.github.com/users/${item.login}/repos`, {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          reposInfo(data); //invoke upon receiving data
        })
        .catch((err) => {
          console.log(err.message);
        });
    });
  });
}

function handleDOMContentLoaded(e) {
  const form = document.querySelector("#github-form");

  //   handle form submission
  form.addEventListener("submit", function (e) {
    // console.log(e.target);
    e.preventDefault();

    const search = document.querySelector("#search");
    const inputValue = search.value;

    // fetch API - 1
    fetch(`https://api.github.com/search/users?q=${inputValue}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        displayUserInformation(data); //invoke upon receiving data
      })
      .catch((err) => {
        console.log(err.message);
      });

    form.reset();
  });
}

// wait HTML to load first
document.addEventListener("DOMContentLoaded", handleDOMContentLoaded);

// TODO: make modular
