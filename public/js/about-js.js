const form=document.querySelector('#sign-up-form');
console.log(form);


const signUpButton = document.querySelector('.sign-up-button');
const errorMsg=document.querySelector('.error-msg');


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

    if(key.length<8){
        errorMsg.innerText="Password should be at least 8 characters!"
        return;
    }

    const data={
        name:name,
        email,
        password: key,
    };

    const options={
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data),


    };

    try{
        let response= await fetch('/user', options);
        const statusCode=response.status;
        response= await response.json();
        // console.log(response);
        if(statusCode!==201 && response.code===11000){
            errorMsg.innerText="Email already in use!"
            return;
        }
        if(statusCode===201){
            console.log(response);
        }

        document.querySelector('#mail').value='';
        document.querySelector('#key').value='';
        document.querySelector('#re-key').value='';
        document.querySelector('#name').value='';



        form.submit();


    }catch(e){
        console.log(e);
    }

    

    




    
    

})