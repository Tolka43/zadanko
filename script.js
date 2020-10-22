let users;

function createUser(user) {
  const userCard = document.createElement("div");
  userCard.classList.add("card", "col");
  const userImage = document.createElement("img");
  userImage.classList.add("card-img-top", 'user-image');
  userImage.src = user.picture.large;
  const userDescriptionDiv = document.createElement("div");
  userDescriptionDiv.classList.add("card-body");
  const userDescription = document.createElement("h5");
  userDescription.classList.add("card-title");
  userDescription.innerText = `Jestem ${user.name.first}, mam lat ${user.dob.age}.`;
  mainDiv.appendChild(userCard);
  userCard.appendChild(userImage);
  userCard.appendChild(userDescription);
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

const refreshUsers = () => {
  const checkboxes = Array.from(
    document.querySelectorAll('input[type="checkbox"]')
  );
  const radios = Array.from(document.querySelectorAll('input[type="radio"]'));
  const dateInput = document.querySelector('input[type="date"]');
  const checkedNationalities = checkboxes
    .filter((checkbox) => checkbox.checked === true)
    .map((checkbox) => checkbox.value);
  const checkedRadio = radios.find((radio) => radio.checked).value;
  const checkedDate = dateInput.valueAsNumber;

  if (checkedNationalities.length > 0) {
    const checkedUsers = users.filter(
      (user) =>
        checkedNationalities.includes(user.nat) &&
        (checkedRadio === user.gender || checkedRadio === "all") &&
        Date.parse(user.dob.date.slice(0, 10)) > checkedDate
    );
    clear();
    createUsers(checkedUsers);
  }
};

const checkInputs = document.querySelectorAll(
  'input[type="checkbox"], input[type="radio"], input[type="date"]'
);

checkInputs.forEach((input) => input.addEventListener("change", refreshUsers));
