function loadBook(filename, displayName) {
    let currentBook = "";
    let url = "books/" + filename;
    console.log(url);
    //reset our UI
    document.getElementById("fileName").innerHTML = displayName;
    document.getElementById("searchstat").innerHTML = "";
    document.getElementById("keyword").value = "";
    // document.getElementById("fileContent").innerHTML = url;
    //create a server a request to load our book
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.send();
    console.log(xhr);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            currentBook = xhr.responseText;
            // console.log(currentBook);
            // getDocStats(currentBook);

            //remove line breaks and carriage returns and replace with a <br>
            currentBook = currentBook.replace(/(?:\r\n|\r|\n)/g, '<br>');

            document.getElementById("fileContent").innerHTML = currentBook;

            var elmnt = document.getElementById("fileContent");
            elmnt.scrollTop = 0;
            getDocStats(currentBook);

        }
    }

}

function getDocStats(fileContent) {

    var docLength = document.getElementById("docLength");
    var wordCount = document.getElementById("wordCount");
    var charCount = document.getElementById("charCount");

    let text = fileContent.toLowerCase();
    let wordArray = text.match(/\b\S+\b/g);
    let wordDictionary = {};
    //count all word in array 
    for (let word in wordArray) {
        let wordValue = wordArray[word];
        if (wordDictionary[wordValue] > 0) {
            wordDictionary[wordValue] += 1;
        } else {
            wordDictionary[wordValue] = 1;
        }
    }
    let wordList = sortProperties(wordDictionary);
    // console.log("wordlist  " + wordList)

    //Return the top 5 words
    var top5Words = wordList.slice(1, 6);
    console.log(top5Words);
    for (i = 0; i < 5; i += 1) {
        document.getElementById("top" + i).innerHTML = top5Words[i];
    }

    //return the least 5 words
    var least5Words = wordList.slice(-6, wordList.length);
    for (i = 0; i < 5; i += 1) {
        document.getElementById("least" + i).innerHTML = least5Words[i];
    }
    // how write in the page
    console.log(least5Words);

}



function sortProperties(obj) {
    // convert object to array
    let rtnArray = Object.entries(obj);
    //sort array to array
    rtnArray.sort(function(first, second) {
        return second[1] - first[1];
    });
    return rtnArray;
};

//search function
//highlight the words in search
function performMark() {

    //read the keyword
    var keyword = document.getElementById("keyword").value;
    var display = document.getElementById("fileContent");

    var newContent = "";

    //find all the currently marked items
    let spans = document.querySelectorAll('mark');



    for (var i = 0; i < spans.length; i++) {
        spans[i].outerHTML = spans[i].innerHTML;
    }

    var re = new RegExp(keyword, "gi");
    var replaceText = "<mark id='markme'>$&</mark>";
    var bookContent = display.innerHTML;

    //add the mark to the book content
    newContent = bookContent.replace(re, replaceText);

    display.innerHTML = newContent;
    var count = document.querySelectorAll('mark').length;
    document.getElementById("searchstat").innerHTML = "found " + count + " matches";

    if (count > 0) {
        var element = document.getElementById("markme");
        element.scrollIntoView();
    };

}