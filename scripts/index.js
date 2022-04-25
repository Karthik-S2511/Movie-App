// Store the wallet amount to your local storage with key "amount"

function addMoney() {
  let ls

  let amount = document.querySelector('#amount').value

  ls = localStorage.setItem('amount', amount) || 0

  let wallet = document.querySelector('#wallet')
  wallet.innerText = amount

  console.log(amount)
}
