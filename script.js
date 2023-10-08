let amountBtns = document.querySelectorAll(".amountBtns input");
let amountInput = document.querySelector("#betAmount");
amountInput.defaultValue = Number(0).toFixed(2);
let balance = document.querySelector(".balance");
let betColors = document.querySelectorAll(".betting-container div");
let betColorsAmount = document.querySelector(".betting-container div p");
let message = document.querySelector(".message");
let clearBtn = document.querySelector(".clearbtn");

amountBtns.forEach(buttons => {
    buttons.addEventListener("click", function() {
        amountInput.value = (Number(amountInput.value) + Number(buttons.value)).toFixed(2);
    })
}) 

clearBtn.addEventListener("click", function() {
    amountInput.value = Number(0).toFixed(2);
})

betColors.forEach(colors => {
    let amount = document.createElement('p');
    colors.append(amount)
    amount.textContent = Number(0).toFixed(2);
    colors.addEventListener("click", function() {
        if (Number(balance.textContent) < Number(amountInput.value)) {
            message.textContent = "Not enough balance."
            message.style.color = "red"
            setTimeout(function() {
                message.textContent = ""
            }, 2000)
        } else if (Number(amountInput.value) < 0){
            message.textContent = "Cannot put negative value."
            message.style.color = "red"
            setTimeout(function() {
                message.textContent = ""
            }, 2000)
        } else {
            amount.textContent = (Number(amount.textContent) + Number(amountInput.value)).toFixed(2);
            balance.textContent = (Number(balance.textContent) -  Number(amountInput.value)).toFixed(2);
        }
    })
})

let revertBtn = document.querySelector(".revertbtn");
revertBtn.addEventListener("click", function() {
    betColors.forEach(colors => {
        let amountBetted = Number(colors.children[1].textContent);
        balance.textContent = (Number(balance.textContent) + amountBetted).toFixed(2);
        colors.children[1].textContent = Number(0).toFixed(2);
    })
})

let goBtn = document.querySelector(".gobtn");
let firstColorResult = document.querySelector(".result-container div:nth-child(1)");
let secondColorResult = document.querySelector(".result-container div:nth-child(2)");
let result = ["rgb(255, 0, 0)","rgb(0, 0, 255)","rgb(0, 128, 0)","rgb(255, 255, 0)","rgb(255, 165, 0)","rgb(128, 0, 128)"]
goBtn.addEventListener("click", function() {
    console.time("test")
    let firstResult = Math.floor(Math.random() * 5.99)
    let secondResult = Math.floor(Math.random() * 5.99)
    firstColorResult.style.background = result[firstResult];
    secondColorResult.style.background = result[secondResult];
    betColors.forEach(colors => {
        if (getComputedStyle(colors).backgroundColor == result[firstResult] && getComputedStyle(colors).backgroundColor == result[secondResult]) {
            balance.textContent = (Number(balance.textContent) + (Number(colors.children[1].textContent) * 3)).toFixed(2)
        } else if (getComputedStyle(colors).backgroundColor == result[firstResult] || getComputedStyle(colors).backgroundColor == result[secondResult]){
            balance.textContent = (Number(balance.textContent) + (Number(colors.children[1].textContent) * 2)).toFixed(2)
        } else {
            balance.textContent = (Number(balance.textContent)).toFixed(2)
        }
        colors.children[1].textContent = Number(0).toFixed(2);
    })
    console.timeEnd("test")
})
