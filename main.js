 
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');
const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}
clipboard.addEventListener('click' ,()=>{
    const textArea = document.createElement("textarea");
    const password = resultEl.innerText;
    if(!password){
        return;
    }
    textArea.value = password;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
    alert("Password Copied to Clipboard");
})
generateEl.addEventListener('click', ()=>{
    const length = + lengthEl.value;
    const hasLower = document.querySelector('#lowercase').checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber= numbersEl.checked;
    const hasSymbol = symbolsEl.checked;
    resultEl.innerText = generatePassword(hasLower,hasUpper, hasNumber, hasSymbol, length);
});
const generatePassword =(lower, upper, number, symbol, length) => {
    let generatedPassword = "";
    const typesCount = lower + upper + number + symbol;
    const typeArr = [{lower},{upper},{number},{symbol}].filter(x => Object.values(x)[0]);

    if(typesCount ===0){
        return 'Select atlest 1 option';
    }
    for(let i=0;i<length;i++){
        typeArr.forEach(x => {
            const funcName = Object.keys(x)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }
    const finalPassword = generatedPassword.slice(0, length);
    console.log(finalPassword)
    return finalPassword;
}
function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
	const symbols = '!@#$%^&*(){}[]=<>/,.'
	return symbols[Math.floor(Math.random() * symbols.length)];
}