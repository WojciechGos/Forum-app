// password validation
const passwordInput = document.getElementById('InputPasswordRegister');
const passwordInputRepeat = document.getElementById('InputPasswordRepeatRegister');
const newSeedInput = document.getElementById('newSeedInput')
const newSeedButton = document.getElementById('newSeedButton')
const avatarWrapper = document.getElementById('avatarWrapper')

passwordInput.addEventListener('change', ()=>{
    console.log(passwordInput.value)
});

passwordInputRepeat.addEventListener('keyup', ()=>{
    console.log(passwordInputRepeat.value);
});


newSeedButton.addEventListener('click', async ()=>{
    let seed = newSeedInput.value
    console.log(seed)
    fetch(`http://localhost:5000/imageCreator/${seed}`)
        .then(async (res)=>{
            
            try{
                avatarWrapper.innerHTML = await res.text()
            }catch(e){
                console.error(e)
            }
                
        })
        .catch((e)=>{
            console.error(e)
        })
        
})

