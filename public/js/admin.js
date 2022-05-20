const listOfAccounts = document.getElementById('allAccountsList');

const urlParams = new URLSearchParams(location.search);

//muy importante:
const id = urlParams.get('account');
let entries = [];



const getAllAccounts = async ()=> {
  const res = await fetch('/api/accounts');
  const data = await res.json();
  renderAccounts(data);
}

const renderAccounts = (data) => {
  data.forEach(account => {
    listOfAccounts.innerHTML += `<a href="/views/account.html?account=${account._id}"
    class="listAccounts__a">
    <li><h3>${account.accountname}</h3><p>  Kontonummer:<br> ${account._id} <br><br>
    Saldo:<br> ${account.balance} kr<br> Typ: ${account.type} </p></li></a>`
  })  
}






const createAccAdmin = document.getElementById("createAccountAdmin");

const Adminform = document.getElementById('addAccountAdmin')
const newNameAdm = document.getElementById('accountnameAdmin');
const newBalanceAdm = document.getElementById('balanceAdmin');
const newTypeAdm = document.getElementById("typeAdmin")


//skapa användare
Adminform.addEventListener('submit', async (e) => {
  e.preventDefault();

  const res = await fetch('/api/accounts', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    }, 
    body: JSON.stringify({
      accountname: newNameAdm.value,
      balance: newBalanceAdm.value,
      type: newTypeAdm.value
    })
  });

  const data = await res.json();
  location.reload();
});



//om inloggad eller inte inloggad, visa olika:
const hideAccounts = ()=> {
  document.getElementById('allAccounts').classList.add('hidden');
  createAccAdmin.classList.add("hidden");
}

const showAccounts = ()=> {
  document.getElementById('allAccounts').classList.remove('hidden');
  createAccAdmin.classList.remove("hidden");
}


//inloggad, visa olika saker
const loggedIn = async () => {
  const res = await fetch('/api/loggedin'); 
  const user = await res.json();
  console.log(user);
  if(user === 'Unauthorized'){
    console.log("Ej inloggad")
    hideAccounts();
    showMainMenu()
  }else{
    console.log("visa konto")
    showAccounts();
    getAllAccounts();
    showAdminMenu();
  }
}

loggedIn();