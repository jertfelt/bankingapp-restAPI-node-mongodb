const mainMenu = document.getElementById("headerMain");
const adminMenu = document.getElementById("headerAdmin");

const showAdminMenu = () => {
  if (adminMenu.classList.contains("hidden")){
    adminMenu.classList.remove("hidden");
    mainMenu.classList.add("hidden");
  }
}

const showMainMenu = () => {
  if (mainMenu.classList.contains("hidden")){
    mainMenu.classList.remove("hidden");
    adminMenu.classList.add("hidden");
  }
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