

var interns = JSON.parse(localStorage.getItem("interns")) || [];
var imageInputPreview = null;
var taskImages = [null, null];

var imageInput = document.getElementById("imageInput");
imageInput.addEventListener('change', function () {

    var file = imageInput.files[0];
    var allowedExtensions = ['jpg', 'jpeg'];

    if (file) {

        var fileName = file.name.toLowerCase();
        var fileExtension = fileName.split('.').pop();

        if (!allowedExtensions.includes(fileExtension)) {

            alert("Image must be jpg or jpeg format!");
            profileImageInput.value = '';
            return;

        } else {

            var reader = new FileReader();
            reader.onload = function (event) {
                var data = event.target.result;
                document.getElementById('imageViewer').src = data
                imageInputPreview = data;

            }

            reader.readAsDataURL(file);

        }
    }
})

var taskImageInput = document.getElementById("fileInputs");
taskImageInput.addEventListener('change', function () {

    var inputs = taskImageInput;

    if (inputs.files.length > 2) {

        alert('Max 2 task images.');
        inputs.value = '';
        return;

    }

    var allowedExtensions = ['jpg', 'jpeg'];

    for (let i = 0; i < inputs.files.length; i++) {

        const fileName = inputs.files[i].name.toLowerCase();
        const fileExtension = fileName.split('.').pop();

        if (!allowedExtensions.includes(fileExtension)) {
            alert('Please upload a JPG files only.');
            taskImageInput.value = '';
            return;
        }

        var reader = new FileReader();
        reader.onload = function (event) {
            var data = event.target.result;
            taskImages[i] = data;
        }

        reader.readAsDataURL(inputs.files[i]);

    }

})

var cancelButton = document.getElementById("cancel-button");
cancelButton.addEventListener("click", function () { window.location.href = "MainPage.html" });

var addButton = document.getElementById("create-button");
addButton.addEventListener("click", function () {
    var intern = new Intern();
    if(intern.errors.length == 0) {
        interns.push(intern);
        localStorage.setItem("interns", JSON.stringify(interns));
        window.location.href = "MainPage.html";
    } else {
        var ul = document.getElementById("error-list");
        ul.innerHTML = "";
        for (var error of intern.errors) {
            var li = document.createElement("li");
            li.style.color = "red";
            li.textContent = error;
            ul.appendChild(li);
        }
    }
})

function Intern() {

    this.name = document.getElementById("name").value;
    this.tel = document.getElementById("tel").value;
    this.email = document.getElementById("email").value;
    this.startDate = document.getElementById("start-date").value;
    this.endDate = document.getElementById("end-date").value;
    this.taskOne = document.getElementById("task-one").value;
    this.taskTwo = document.getElementById("task-two").value;
    this.department = document.getElementById("department").value;
    this.mentor = document.getElementById("mentor").value;
    this.resultOne = document.getElementById("result-one").value;
    this.resultTwo = document.getElementById("result-two").value;
    this.imageInputPreview = imageInputPreview;
    this.taskImages = taskImages;
    this.errors = [];

    const duplicateName = interns.some(intern => intern.name === this.name);
    if (duplicateName) {
        this.errors.push("Intern name must be unique.");
    } else if(this.name === "") {
        this.errors.push("Name is required.");
    }

    if (this.tel === "") {
        this.errors.push("Telephone is required.");
    }

    var emailRegex = /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;
    const duplicateEmail = interns.some(intern => intern.email === this.email);

    if (this.email === "") {
        this.errors.push("Email is required.");
    } else if (!emailRegex.test(this.email)) {
        this.errors.push("Enter valid email.");
    } else if (duplicateEmail) {
        this.errors.push("There already is an user with this email address.");
    }

    if (new Date(this.startDate).toString() === "Invalid Date") {
        this.errors.push("Start Date is required.");
    }

    if (new Date(this.endDate).toString() === "Invalid Date") {
        this.errors.push("End Date is required.");
    }

    if(new Date(this.startDate) >= new Date(this.endDate)) {
        this.errors.push("Start Date must be before End Date");
    }

    if (this.mentor === "") {
        this.errors.push("Mentor is required.");
    }

}

