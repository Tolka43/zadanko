let users;

function createUser(user) {
  const userContainer = document.createElement("div");
  userContainer.innerText = `Jestem ${user.name.first}, mam lat ${user.dob.age}.`;
  mainDiv.appendChild(userContainer);
}

function createUsers(users) {
  users.forEach(createUser);
}

function clear() {
  mainDiv.innerHTML = "";
}

function fetchUsers(count) {
  fetch(`https://randomuser.me/api?results=${count}&nat=gb,fr`)
    .then((res) => res.json())
    .then((res) => {
      clear();
      createUsers(res.results);
      users = res.results;
    });
}

const mainDiv = document.querySelector(".main");

const input = document.querySelector("input");

const downloadButton = document.querySelector(".download-button");
downloadButton.addEventListener("click", () => {
  fetchUsers(input.value);
});

const radioButtons = document.querySelectorAll('input[type="radio"]');

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

const checkboxes = Array.from(
  document.querySelectorAll('input[type="checkbox"]')
);
const radios = Array.from(document.querySelectorAll('input[type="radio"]'));

const refreshUsers = (event) => {
  const checkedNationalities = checkboxes
    .filter((checkbox) => checkbox.checked === true)
    .map((checkbox) => checkbox.value);
  const checkedRadio = radios.find((radio) => radio.checked);
  if (checkedNationalities) {
    const checkedNatUsers = users.filter((user) =>
      checkedNationalities.includes(user.nat)
    );
    clear();
    createUsers(checkedNatUsers);
  }
};

checkboxes.forEach((checkbox) =>
  checkbox.addEventListener("change", refreshUsers)
);
