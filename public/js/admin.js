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


//om inloggad eller inte inloggad, visa olika:
const hideAccounts = ()=> {
  document.getElementById('allAccounts').classList.add('hidden');
}

const showAccounts = ()=> {
  document.getElementById('allAccounts').classList.remove('hidden');
}

