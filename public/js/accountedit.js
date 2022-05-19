//KONTOTS ID FRÅN QUERYSTRING
const urlParams = new URLSearchParams(location.search);
const id = urlParams.get('account');

const accountInfo = document.getElementById('accountInfoDiv');

//FORMULÄR
const addForm = document.getElementById('addCash');
const withdrawForm = document.getElementById('withdrawCash');
const addAmount = document.getElementById('addAmount');
const withdrawAmount = document.getElementById('withdrawAmount');
const deleteAccount = document.getElementById('deleteAccount');

// //TA BORT KONTO
// deleteAccount.addEventListener('submit', async (e) => {
//   e.preventDefault();
//   if(confirm('Är du säker?')){
//     const res = await fetch(`/api/accounts/${id}`, {
//       method: 'DELETE', 
//       headers: {
//         'Content-type': 'application/json'
//       }
//     });
//     window.location.href = '/index.html';
//   }
// });

// //SÄTT IN PENGAR
// addForm.addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const currentAmount = entries.balance;
//   const newBalance = parseFloat(addAmount.value) + parseFloat(currentAmount);
//   console.log(currentAmount, newBalance)

//   const res = await fetch(`/api/account/${id}`, {
//     method: 'PUT', 
//     headers: {
//       'Content-type': 'application/json'
//     },
//     body: JSON.stringify({
//       balance : newBalance, 
//     }
//   )});

//   const data = await res.json(); 
//   console.log(data);
//   location.reload();
// });

// //TA UT PENGAR
// withdrawForm.addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const currentAmount = entries.balance;
//   const newBalance = parseFloat(currentAmount) - parseFloat(withdrawAmount.value);

//   if(newBalance<0){ 
//     alert('Du kan inte ta ut mer pengar än du har på kontot.')
//     return;
//   }

//   const res = await fetch(`/api/account/${id}`, {
//     method: 'PUT', 
//     headers: {
//       'Content-type': 'application/json'
//     },
//     body: JSON.stringify({
//       balance : newBalance, 
//     }
//   )});

//   const data = await res.json(); 
//   console.log(data);
//   location.reload();
// });


const getAccountInfo = async (id) => {
  const res = await fetch(`/api/accounts/${id}`);
  const data = await res.json();
  renderAccount(data);
  entries = data;
}
getAccountInfo(id);


let entries = [];

const renderAccount = (data) => {
  accountInfo.innerHTML = `
  <p>${data.accountname} <br> Kontonummer: ${data._id} <br> Saldo: ${data.balance} kr<br>
  Typ: ${data.type}</p>`;
}