var myModal;
var formDataList = [];

//open modal on screen load
document.addEventListener('DOMContentLoaded', function () {
    // Get the modal element by its ID
    myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
        backdrop: 'static', // Disable clicking outside the modal to close
        keyboard: false // Disable closing the modal with the keyboard
    });

    // Open the modal
    // myModal.show();
    formCreation();
});

function getSelectedRadioButton() {
    // Get all radio buttons with the specified name
    var radioButtons = document.getElementsByName('technology');

    // Loop through the radio buttons to find the selected one
    for (var i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            // Return the value of the selected radio button
            return radioButtons[i].value;
        }
    }

    // Return null if no radio button is selected
    return null;
}

//validate and save data
function stFunctionClick() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let country = document.getElementById('country').value;
    
    if (name == "" || email == "" || phone == "" || country == "") {
        alert("Please fill all the fields");
    } else {
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
function saveData(data) {
    localStorage.setItem('data', JSON.stringify(data));
}

function formCreation() {
    let formDiv = document.getElementById('formDiv');

    // Create a new form group div
    let formGroup = document.createElement('div');
    formGroup.classList.add('form-group', 'formDesign');

    // Create input elements and append them to the form group
    let placeholders = ['Features', 'Sub Features', 'Reference', 'Website', 'Description'];
    for (let i = 1; i <= 5; i++) {
        let input = document.createElement('input');
        input.type = 'text';
        input.classList.add('form-control');
        input.placeholder = placeholders[i - 1];
        input.id = `i${i}`;
        formGroup.appendChild(input);
        formGroup.appendChild(document.createTextNode('\u00A0')); // Add non-breaking space
    }

    // Create file input element for multiple image files
    let fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*'; // Accept only image files
    fileInput.classList.add('form-control-file');
    fileInput.id = 'fileInput';
    fileInput.setAttribute('multiple', 'multiple');

    // Add an event listener to trigger image display on file selection
    fileInput.addEventListener('change', function() {
        getFormData();
    });

    // Append the file input to the form group
    formGroup.appendChild(fileInput);

    // Append the form group to the formDiv
    formDiv.appendChild(formGroup);

    // Update the formDataList after adding a new form
    getFormData();
}

function addForm() {
    if (validateFields()) {
        formCreation();
        // Log the list of form data to the console
        console.log(formDataList);
    } else {
        alert("Please fill in all the fields before adding a new form.");
    }
}

function submitData() {
    if (validateFields()) {
        let technology = getSelectedRadioButton();
        getFormData();
        let data = {
            technology: technology,
            formDataList: formDataList
        };
        console.log(data);
        // localStorage.setItem('data', JSON.stringify(data));
        // window.location.href = 'submit.html';
    } else {
        alert("Please fill in all the fields before submitting data.");
    }
}

function validateFields() {
    let formElements = document.querySelectorAll('#formDiv .formDesign');

    for (let formElement of formElements) {
        let inputs = formElement.querySelectorAll('input[type="text"]');
        for (let input of inputs) {
            if (input.value.trim() === "") {
                return false; // Field is empty
            }
        }
    }

    return true; // All fields are filled
}
function getFormData() {
    formDataList = [];

    let formElements = document.querySelectorAll('#formDiv .formDesign');

    formElements.forEach((formElement) => {
        let formData = {
            features: formElement.querySelector('#i1').value,
            subFeatures: formElement.querySelector('#i2').value,
            reference: formElement.querySelector('#i3').value,
            website: formElement.querySelector('#i4').value,
            description: formElement.querySelector('#i5').value,
            images: getSelectedImages(formElement.querySelector('#fileInput').files)
        };

        formDataList.push(formData);
    });

    // Display selected images in the "imageDiv"
    displayImages();
}

function getSelectedImages(files) {
    // Filter out non-image files
    let imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    
    // Return an array of file objects
    return imageFiles;
}

function displayImages() {
    let imageDiv = document.getElementById('imageDiv');
    imageDiv.innerHTML = ''; // Clear existing content

    formDataList.forEach((formData, index) => {
        formData.images.forEach((image, i) => {
            let card = document.createElement('div');
            card.classList.add('card');
            card.classList.add('imgCard');

            let img = document.createElement('img');
            img.src = URL.createObjectURL(image);
            img.alt = `Image ${i + 1}`;

            // Set fixed height and width for the image
            img.style.width = '100px';
            img.style.height = '100px';

            card.appendChild(img);
            imageDiv.appendChild(card);
        });
    });
}

function submitData() {
    if (validateFields()) {
        let technology = getSelectedRadioButton();
        let stData = JSON.parse(localStorage.getItem('data'));
        getFormData();
        let data = {
            userData: stData,
            technology: technology,
            formDataList: formDataList
        };
        console.log(data);
        // localStorage.setItem('data', JSON.stringify(data));
        // window.location.href = 'submit.html';
    } else {
        alert("Please fill in all the fields before adding a new form.");
    }
}