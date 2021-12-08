const form= document.querySelector('#login-form');

const loginBtn = document.querySelector('.login-button');
const errorMsg= document.querySelector('.error-msg');


loginBtn.addEventListener('click', async (e)=>{
    console.log('clicked');
    const email=document.querySelector('#mail').value;
    const key=document.querySelector('#key').value;
    if(email.trim()===''){
        errorMsg.innerText='Email required!';
        return;
    }

    const data={
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
        let response= await fetch('/user/login', options);
        const statusCode=response.status;
        // console.log(response);
        if(statusCode===400){
            errorMsg.innerText="Authentication failed!"
            return;
        }

        document.querySelector('#mail').value='';
        document.querySelector('#key').value='';
        



        form.submit();


    }catch(e){
        console.log(e);
    }

})