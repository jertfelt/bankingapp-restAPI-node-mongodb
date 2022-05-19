
const listOfAccounts = document.getElementById('allAccountsList');
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



//*--bankkonton:
const getAllAccounts = async ()=> {
  const res = await fetch('/api/accounts');
  const data = await res.json();
  renderAccounts(data);
  // document.getElementById("allAccounts").classList.remove("hidden")
}

const renderAccounts = (data) => {
  data.forEach(account => {
    listOfAccounts.innerHTML += `<a href="/account.html?account=${account._id}"
    class="listAccounts__a">
    <li><h3>${account.accountname}</h3><p>  Kontonummer:<br> ${account._id} <br><br>
    Saldo:<br> ${account.balance} kr<br> Typ: ${account.type} </p></li></a>`
  })  
}

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



getAllAccounts();

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