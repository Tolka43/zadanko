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

const refreshUsers = (event) => {
  const checkboxes = Array.from(
    document.querySelectorAll('input[type="checkbox"]')
  );
  const radios = Array.from(document.querySelectorAll('input[type="radio"]'));
  const checkedNationalities = checkboxes
    .filter((checkbox) => checkbox.checked === true)
    .map((checkbox) => checkbox.value);
  const checkedRadio = radios.find((radio) => radio.checked).value;
  if (checkedNationalities) {
    const checkedNatUsers = users.filter(
      (user) =>
        checkedNationalities.includes(user.nat) &&
        (checkedRadio === user.gender || checkedRadio === "all")
    );
    clear();
    createUsers(checkedNatUsers);
  }
};

const checkInputs = document.querySelectorAll(
  'input[type="checkbox"], input[type="radio"]'
);

checkInputs.forEach((input) => input.addEventListener("change", refreshUsers));

const dateInput = document.querySelector('input[type="date"]');

function dates() {
  const checkedDate = dateInput.valueAsNumber;
  const usersFilteredByAge = users.filter((user) => Date.parse(user.dob.date) > checkedDate);
}
