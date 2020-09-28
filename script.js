const input = document.querySelector('input');

function fetchUsers(count) {
  fetch(`https://randomuser.me/api?results=${count}`)
    .then((res) => res.json())
    .then((res) => {
      createUsers(res.results);
    });
}

const downloadButton = document.querySelector('.download-button');
downloadButton.addEventListener('click', () => {
  fetchUsers(input.value);
});

const mainDiv = document.querySelector('.main');

function createUser(user) {
  const userContainer = document.createElement('div');
  userContainer.innerText = `Jestem ${user.name.first}, mam lat ${user.dob.age}.`;
  mainDiv.appendChild(userContainer);
}

function createUsers(users) {
  users.forEach(createUser);
}
