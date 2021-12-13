const form=document.querySelector('#sign-up-form');
// console.log(form);


const signUpButton = document.querySelector('.sign-up-button');
const errorMsg=document.querySelector('.error-msg');

function ValidateEmail(email) {

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
    if (email.match(validRegex)) {
  
      return true;
  
    } else {  
      return false;
  
    }
  
  }


signUpButton.addEventListener('click', async (e)=>{
    const email=document.querySelector('#mail').value;
    const key=document.querySelector('#key').value;
    const reKey=document.querySelector('#re-key').value;
    const name=document.querySelector('#name').value;

    // window.location.pathname = '/list'

    if(name.trim()===''){
        errorMsg.innerText='Name required!';
        return;
    }

    if(email.trim()===''){
        errorMsg.innerText='Email required!';
        return;
    }

    if(key.trim()===''){
        errorMsg.innerText='Password required!';
        return;
    }

    

    if(key!==reKey){
        errorMsg.innerText="Passwords do not match!";
        return;
    }

    if(!ValidateEmail(email)){
        errorMsg.innerText="Invalid mail id!";
        return;
    }

    if(key.length<8){
        errorMsg.innerText="Password should be at least 8 characters!"
        return;
    }

    var response= await fetch(`/user/email/${email}`);
    response= await response.json();
    
    if(response.avail=== false){
        errorMsg.innerText="Email already in use!"
        return;
    }

    form.submit();

    

    

    




    
    

})