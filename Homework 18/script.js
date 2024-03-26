function countWords() {
    var sentence = document.getElementById("sentenceInput").value
    if (sentence == "") {
      alert("Please enter a sentence.");
      return;
    }

    var words = sentence.match(/\b\w+\b/g); 
    

    var wordListDiv = document.getElementById("wordList");
    var totalWordsDiv = document.getElementById("totalWords");
  
    wordListDiv.innerHTML = "<ul'>";
    
    words.forEach(function(word) {
    wordListDiv.innerHTML += "<li style='list-style-type: none;margin:8px;color:teal;'>" + word + "</li>";
    });
     wordListDiv.innerHTML += "</ul>";

    var wordCount = words.length;
    totalWordsDiv.innerText = "There are "  + wordCount + " words in total";
  }