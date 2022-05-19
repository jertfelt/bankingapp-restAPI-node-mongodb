
const listOfAccounts = document.getElementById('allAccountsList');
const form = document.getElementById('addAccount');
const newName = document.getElementById('accountname');
const newBalance = document.getElementById('balance');
const newType = document.getElementById("type")


const loginForm = document.getElementById('login');
const loginName = document.getElementById('loginname');
const loginPass = document.getElementById('loginpass');


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


loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const response = await fetch('/api/login', {
    method: 'POST', 
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      loginName : loginName.value, 
      loginPass : loginPass.value
    }
  )});

  const data = await res.json(); 
  console.log(data);
  location.reload();
});



getAllAccounts();