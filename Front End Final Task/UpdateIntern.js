

var params = new URLSearchParams(new URL(window.location.href).search);
var name = params.get("name");

var interns = JSON.parse(localStorage.getItem("interns"));
var intern = interns.find(intern => intern.name === name);

var imageInputPreview = intern.imageInputPreview;
var taskImages = intern.taskImages;

document.getElementById("name").value = intern.name;
document.getElementById("tel").value = intern.tel;
document.getElementById("email").value = intern.email;
document.getElementById("start-date").value = intern.startDate;
document.getElementById("end-date").value = intern.endDate;
document.getElementById("task-one").value = intern.taskOne;
document.getElementById("task-two").value = intern.taskTwo;
document.getElementById("department").value = intern.department;
document.getElementById("mentor").value = intern.mentor;
document.getElementById("result-one").value = intern.resultOne;
document.getElementById("result-two").value = intern.resultTwo;

if (imageInputPreview) {
    document.getElementById("imageViewer").src = imageInputPreview;
}

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
                console.log(document.getElementById('imageViewer').src = data);
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
            console.log(taskImages);
        }

        reader.readAsDataURL(inputs.files[i]);

    }

})

var deleteButton = document.getElementById("delete-button");
deleteButton.addEventListener("click", function () {
    interns = interns.filter(intern => intern.name !== name);
    localStorage.setItem("interns", JSON.stringify(interns));
    window.location.href = "MainPage.html";
})

var cancelButton = document.getElementById("cancel-button");
cancelButton.addEventListener("click", function () { window.location.href = "MainPage.html" });

var updateButton = document.getElementById("update-button");
updateButton.addEventListener("click", function () {
    var intern = new Intern();
    if (intern.errors.length == 0) {
        interns = interns.filter(intern => intern.name !== name);
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

    var localInterns = interns.filter(intern => intern.name !== name);

    const duplicateName = localInterns.some(intern => intern.name === this.name);
    if (duplicateName) {
        this.errors.push("Intern name must be unique.");
    } else if (this.name === "") {
        this.errors.push("Name is required.");
    }

    if (this.tel === "") {
        this.errors.push("Telephone is required.");
    }

    var emailRegex = /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;
    const duplicateEmail = localInterns.some(intern => intern.email === this.email);

    if (this.email === "") {
        this.errors.push("Email is required.");
    } else if (!emailRegex.test(this.email)) {
        this.errors.push("Enter valid email.");
    } else if (duplicateEmail) {
        this.errors.push("Email must be unique.");
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
