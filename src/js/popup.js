import "../css/popup.css";
import hello from "./popup/example";
import findText from "./script";

// hello();
document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const text = document.getElementById("input").value;
    console.log(text)
    document.getElementById("input").value = "";
    sendMsg(text);
    

});

function sendMsg(text) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: text}, function(response) {
          console.log(response);
        });
      });
    }
