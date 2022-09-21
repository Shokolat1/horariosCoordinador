let btnPassGen = document.getElementById('passGen')
let password = document.getElementById('password')

var length = 6
function generatePassword() {
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

btnPassGen.addEventListener('click', ()=>{
    let x = generatePassword()
    password.value = x
})