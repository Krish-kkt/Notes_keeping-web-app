
const addTaskBtn= document.querySelector('#add-task-btn');
let itemContainer= document.querySelector('.item-container');

const inputItemForm= document.querySelector('.input-item-form');


var checkBoxButtonsClicked = document.getElementsByClassName('item-checkbox');

for(var i=0; i<checkBoxButtonsClicked.length; i++){
    const clickValue= checkBoxButtonsClicked[i].value === 'false'? false: true;
    checkBoxButtonsClicked[i].checked= clickValue;
}


const checkBoxListener= function(){
    var checkBoxButtons = document.getElementsByClassName('item-checkbox');
    for(var i=0;i<checkBoxButtons.length; i++){
        checkBoxButtons[i].addEventListener('click', async (e)=>{
            e.preventDefault();
            //console.log(e.target.value);
            
            const newValue=(e.target.value)=== 'false' ? true: false;
            //console.log(newValue);
            const id= e.target.nextElementSibling.nextElementSibling.value;
            //console.log(id);

            const data={
                id,
                completed: newValue,
            }

            const options={
                method: 'PATCH',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(data),

            }

            try{
                const response= fetch('/task', options);
                const statusCode=(await response).status;
                if(statusCode!==404){
                    e.target.value=newValue;
                    console.log(e.target.value);
                    e.target.checked=newValue;
                }

            }catch(e){
                console.log(e);
            }

        })
    }
}


checkBoxListener();


const checkBoxListenerAdded= function(){
    var checkBoxButtons = document.getElementsByClassName('item-checkbox');
    checkBoxButtons[0].addEventListener('click', async (e)=>{
        e.preventDefault();
        //console.log(e.target.value);
        
        const newValue=(e.target.value)=== 'false' ? true: false;
        //console.log(newValue);
        const id= e.target.nextElementSibling.nextElementSibling.value;
        //console.log(id);

        const data={
            id,
            completed: newValue,
        }

        const options={
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data),

        }

        try{
            const response= fetch('/task', options);
            const statusCode=(await response).status;
            if(statusCode!==404){
                e.target.value=newValue;
                console.log(e.target.value);
                e.target.checked=newValue;
            }

        }catch(e){
            console.log(e);
        }

    })

}



const deleteListener = function(){
    var deleteTaskForms= document.getElementsByClassName('task-delete-form');
    for(var i=0;i< deleteTaskForms.length; i++){
        deleteTaskForms[i].addEventListener('submit', async (e)=>{
            e.preventDefault();
            const taskId=e.target.elements[1].value;
    
    
            const deleteUrl=`/task/${taskId}`;
    
            const options={
                method: 'DELETE',
                headers: {
                    'Content-Type' : 'application/json'
                },
        
        
            };
    
            try{
                var response= await fetch(deleteUrl, options);
                const statusCode= response.status;
                if(statusCode!=404 && statusCode!=500){
                    var currentTaskElement=e.target.parentNode;
                    currentTaskElement.remove();
                }
            }catch (e){
    
                console.log(e);
            }
    
        })
    }


}

deleteListener();

const deleteListenerAdded = function(){
    var deleteTaskForms= document.getElementsByClassName('task-delete-form');
    deleteTaskForms[0].addEventListener('submit', async (e)=>{
        e.preventDefault();
        const taskId=e.target.elements[1].value;


        const deleteUrl=`/task/${taskId}`;

        const options={
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json'
            },
    
    
        };

        try{
            var response= await fetch(deleteUrl, options);
            const statusCode= response.status;
            if(statusCode!=404 && statusCode!=500){
                var currentTaskElement=e.target.parentNode;
                currentTaskElement.remove();
            }
        }catch (e){

            console.log(e);
        }

    })
}










inputItemForm.addEventListener('submit',async (e)=>{
    e.preventDefault();
    let newTask=document.querySelector('.input-new-task');
    if(newTask.value.trim()===''){
        newTask.value='';
        return;
    }

    const data={
        description: newTask.value,
    }

    const options={
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data),


    };

    try{
        let response= await fetch('/task', options);
        const statusCode=response.status;
        response= await response.json();
        // console.log(response);
        if(statusCode===201){
            let taskElement= document.createElement('div');
            const taskInnerHtml=
             `<div class="item-note">
              <input type="checkbox" class="item-checkbox" value="${response.completed}">
              <p>${response.description}</p>
              <input type="hidden" name="task-id" value="${response._id}">
            </div>
              

          <form action="" class="task-delete-form">
            <button type="submit" class="delete-button"><img src="img/delete.png" id="delete-img" alt="delete"></button>
            <input type="hidden" name="task-id" value="${response._id}">

          </form>`;

            taskElement.classList.add("item");

            taskElement.innerHTML= taskInnerHtml;
            itemContainer.insertBefore(taskElement, itemContainer.firstChild);
            deleteListenerAdded();
            checkBoxListenerAdded();

            newTask.value='';


        }


    }catch(e){
        console.log(e);
    }

    



})


const logoutBtn = document.querySelector('.logout-btn');

logoutBtn.addEventListener('click', (e)=>{
    const overlay= document.querySelector('.modal-overlay');
    const modal= document.querySelector('.modal');

    overlay.classList.add("active");
    modal.classList.add("active");


})


const modalCloseBtn = document.querySelector('.close-btn');

modalCloseBtn.addEventListener('click', (e)=>{
    const overlay= document.querySelector('.modal-overlay');
    const modal= document.querySelector('.modal');

    overlay.classList.remove("active");
    modal.classList.remove("active");


})


const modalOverlay = document.querySelector('.modal-overlay');

modalOverlay.addEventListener('click', (e)=>{
    const overlay= document.querySelector('.modal-overlay');
    const modal= document.querySelector('.modal');

    overlay.classList.remove("active");
    modal.classList.remove("active");
})