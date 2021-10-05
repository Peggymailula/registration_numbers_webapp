document.addEventListener('DOMContentLoaded', function(){

    let errorMsg= document.querySelector('.errors');
    let successMsg = document.querySelector('.success');
    

    if(errorMsg !== ''){
        setTimeout(() => {
            errorMsg.innerHTML='';
            
        },3000);
    }

    if(successMsg !== '' ){
        setTimeout(() => {
            successMsg.innerHTML='';
            
        },3000);
    }

});