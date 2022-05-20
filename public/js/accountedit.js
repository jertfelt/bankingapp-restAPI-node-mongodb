const urlParams = new URLSearchParams(location.search);

//muy importante:
const id = urlParams.get('account');

const accountInfoDiv = document.getElementById('renderAccount');
const addForm = document.getElementById("addCapital");
const withdrawForm = document.getElementById("withdrawCapital");
const addAmount = document.getElementById("addAmount");
const withdrawAmount = document.getElementById("withdrawAmount");
const deleteAccount = document.getElementById("deleteAccount");
const editAccount = document.getElementById("editAccount");

let entries = [];

const getAccountInfo = async (id) => {
  const res = await fetch(`/api/accounts/${id}`);
  const data = await res.json();
  renderAccount(data);
  entries = data;
}

// console.log(id)
getAccountInfo(id);

//*-----------rendera användare:
const renderAccount = (data) => {
  accountInfoDiv.innerHTML = `
  <h3 class="font--purple">
  ${data.accountname}</h3> 
  <p>Typ: ${data.type}</p>
  <p>Kontonummer: ${data._id}</p> 
  <p>Saldo: ${data.balance} SEK</p>
  `;
}


//*--------------pengarna
//lägg till $
addForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const currentAmount = entries.balance;
  const newBalance = parseFloat(addAmount.value) + parseFloat(currentAmount);
  console.log(currentAmount, newBalance)

  const res = await fetch(`/api/account/${id}`, {
    method: 'PUT', 
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      balance : newBalance, 
    }
  )});

  const data = await res.json(); 
  console.log(data);
  location.reload();
});

//ta bort $
withdrawForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const currentAmount = entries.balance;
  const newBalance = parseFloat(currentAmount) - parseFloat(withdrawAmount.value);

  if(newBalance<0){ 
    alert('Du kan inte ta ut mer pengar än du har på kontot.')
    return;
  }

  const res = await fetch(`/api/account/${id}`, {
    method: 'PUT', 
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      balance : newBalance, 
    }
  )});

  const data = await res.json(); 
  window.location.assign("/");
});


//*------------edit och delete

//i framtiden: möjlighet att byta kontonamn

//ta bort användaren
deleteAccount.addEventListener('submit', async (e) => {
  e.preventDefault();
  if(confirm('Är du säker?')){
    const res = await fetch(`/api/accounts/${id}`, {
      method: 'DELETE', 
      headers: {
        'Content-type': 'application/json'
      }
    });
    window.location.href = '/index.html';
  }
});