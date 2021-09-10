// password validation
const passwordInput = document.getElementById('InputPasswordRegister');
const passwordInputRepeat = document.getElementById('InputPasswordRepeatRegister');


passwordInput.addEventListener('change', ()=>{
    console.log(passwordInput.value)
});

passwordInputRepeat.addEventListener('keyup', ()=>{
    console.log(passwordInputRepeat.value);
});