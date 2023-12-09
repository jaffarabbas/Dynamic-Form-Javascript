var myModal;
//open modal on screen load
document.addEventListener('DOMContentLoaded', function () {
    // Get the modal element by its ID
    myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
        backdrop: 'static', // Disable clicking outside the modal to close
        keyboard: false // Disable closing the modal with the keyboard
    });

    // Open the modal
    // myModal.show();
});

//validate and save data
function stFunctionClick(){
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let country = document.getElementById('country').value;
    console.log(name);
    console.log(email);
    console.log(phone);
    console.log(country);
    if(name == "" || email == "" || phone == "" || country == ""){
        alert("Please fill all the fields");
    }else{
        myModal.hide();
        let data = {
            name: name,
            email: email,
            phone: phone,
            country: country
        }
        saveData(data);
    }
}


//save data to local storage
function saveData(data){
    localStorage.setItem('data', JSON.stringify(data));
}