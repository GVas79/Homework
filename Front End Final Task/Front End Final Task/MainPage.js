        
        var createButton = document.getElementById('create-button');
        var cancelButton = document.getElementById('clear-button');

        createButton.addEventListener('click', function () { window.location.href = 'AddIntern.html' });
    
        function displayInterns() {

            var interns = JSON.parse(localStorage.getItem("interns")) || [];
            var table = document.getElementById("table");

            for (var intern of interns) {

                var nameTd = document.createElement("td");
                var nameA = document.createElement("a");
                nameA.href = "UpdateIntern.html?name=" + intern.name;
                nameA.textContent = intern.name;
                nameTd.appendChild(nameA);
                document.getElementById("names").appendChild(nameTd);

                var tdImage = document.createElement("td");
                var image = document.createElement("img");
                tdImage.appendChild(image);
                image.src = intern.imageInputPreview;
                document.getElementById("images").appendChild(tdImage);

                var tel = document.createElement("td");
                tel.textContent = intern.tel;
                document.getElementById("telephones").appendChild(tel);

                var email = document.createElement("td");
                email.textContent = intern.email;
                document.getElementById('emails').appendChild(email);

                var startDate = document.createElement("td");
                startDate.textContent = intern.startDate;
                document.getElementById('start-dates').appendChild(startDate);

                var endDate = document.createElement("td");
                endDate.textContent = intern.endDate;
                document.getElementById('end-dates').appendChild(endDate);

                

                var left = document.createElement("td");

                var start = new Date(intern.startDate);
                var end = new Date(intern.endDate);
                var today = new Date();

                var totalDays = (end - start) / (1000 * 60 * 60 * 24);
                var totalPassed = (today - start) / (1000 * 60 * 60 * 24);

                var percentage = (totalPassed / totalDays) * 100;

                if ((totalDays - totalPassed).toFixed(0) < 10) {
                    left.style.color = "red";
                }

                left.textContent = (totalDays - totalPassed).toFixed(0) + ` (${percentage.toFixed(2)} %)`;
                document.getElementById('lefts').appendChild(left);


                var taskOne = document.createElement("td");
                taskOne.textContent = intern.taskOne;
                document.getElementById('task-ones').appendChild(taskOne);

                var taskTwo = document.createElement("td");
                taskTwo.textContent = intern.taskTwo;
                document.getElementById('task-twos').appendChild(taskTwo);

                var department = document.createElement("td");
                department.textContent = intern.department;
                document.getElementById('departments').appendChild(department);

                var mentor = document.createElement("td");
                mentor.textContent = intern.mentor;
                document.getElementById('mentors').appendChild(mentor);

                var resultOne = document.createElement("td");
                resultOne.textContent = intern.resultOne;
                document.getElementById('first-task-results').appendChild(resultOne);

                var resultTwo = document.createElement("td");
                resultTwo.textContent = intern.resultTwo;
                document.getElementById('second-task-results').appendChild(resultTwo);

                var result = document.createElement("td");
                if(Number(intern.resultOne) >= 50 && Number(intern.resultTwo) >= 50) {
                    result.style.color = "green";
                    result.textContent = "Passed";
                } else if(intern.resultOne == "" || intern.resultTwo == "") {
                    result.textContent = "Pending";
                    result.style.color = "orange";
                } else {
                    result.style.color = "red";
                    result.textContent = "Failed";
                }
                document.getElementById('results').appendChild(result);

                var images = intern.taskImages;
                var tdElem = document.createElement('td');
                for (var img of images) {
                    if(img != null) {
                        var imgElem = document.createElement('img');
                        imgElem.classList.add('icon');
                        imgElem.src = 'file.png';
                        tdElem.appendChild(imgElem);
                    }
                }
                document.getElementById('task-images').appendChild(tdElem);

            }

        }

        window.onload = displayInterns;