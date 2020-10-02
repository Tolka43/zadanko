let users;

const input = document.querySelector("input");

function fetchUsers(count) {
  fetch(`https://randomuser.me/api?results=${count}`)
    .then((res) => res.json())
    .then((res) => {
      createUsers(res.results);
      users = res.results;
    });
}

const downloadButton = document.querySelector(".download-button");
downloadButton.addEventListener("click", () => {
  fetchUsers(input.value);
});

const mainDiv = document.querySelector(".main");

function createUser(user) {
  const userContainer = document.createElement("div");
  userContainer.innerText = `Jestem ${user.name.first}, mam lat ${user.dob.age}.`;
  mainDiv.appendChild(userContainer);
}

function createUsers(users) {
  users.forEach(createUser);
}

const radioButtons = document.querySelectorAll('input[type="radio"]');

function clear() {
  mainDiv.innerHTML = "";
}

function radioListener(event) {
  if (!users) {
    return;
  }
  if (event.target.value === "all") {
    clear();
    createUsers(users);
    return;
  }
  if (event.target.value === "male") {
    clear();
    const male = users.filter((user) => user.gender === "male");
    createUsers(male);
    return;
  }
  if (event.target.value === "female") {
    clear();
    const female = users.filter((user) => user.gender === "female");
    createUsers(female);
  }
}

radioButtons.forEach((input) => {
  input.addEventListener("change", radioListener);
});
