const btnE1 = document.getElementById("calculate");
const billE1 = document.getElementById("bill");
const tipE1 = document.getElementById("tip");
const totalE1 = document.getElementById("total");


function calculateTotal(){
    const billValue = billE1.value;
    const tipValue  = tipE1.value;
    const totalValue = billValue * (1 + tipValue / 100);
    totalE1.innerText = totalValue.toFixed(2);
}

btnE1.addEventListener('click', calculateTotal);