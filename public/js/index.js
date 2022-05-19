

const form = document.getElementById('addAccount');
const newName = document.getElementById('accountname');
const newBalance = document.getElementById('balance');
const newType = document.getElementById("type")

//users
const registerUser = document.getElementById('register');
const newUsername = document.getElementById('userName');
const newUserpassword = document.getElementById('userPassword');

const loginForm = document.getElementById('login');
const loginUsername = document.getElementById('username');
const loginPassword = document.getElementById('password');
const logout = document.getElementById('logout');

//skapa användare
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const res = await fetch('/api/accounts', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    }, 
    body: JSON.stringify({
      accountname: newName.value,
      balance: newBalance.value,
      type: newType.value
    })
  });

  const data = await res.json();
  location.reload();
});


//registrera ny användare:
registerUser.addEventListener('submit', async (e) => {
  e.preventDefault();

  const res = await fetch('/api/users', {
    method: 'POST', 
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      user : newUsername.value, 
      pass : newUserpassword.value
    })
  });

  const data = await res.json(); 

  let msg = document.createElement('h3');
  msg.innerHTML = `Välkommen till Ekobanken!`
  registerUser.append(msg);
});


///logga in
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const res = await fetch('/api/login', {
    method: 'POST', 
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      loginName : loginUsername.value, 
      loginPass : loginPassword.value
    }
  )}).then(() =>{
    window.location.assign("/admin.html")
  })
  .catch((error) =>{
    alert("Fel lösenord eller användarnamn!")
    console.log(error)
}
)});

//logga ut
logout.addEventListener('submit', async (e) => {
  e.preventDefault();
  const res = await fetch('/api/logout', {
    method: 'POST', 
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      loginName : loginUsername.value, 
      loginPass : loginPassword.value
    })
  });
  location.reload();
});



