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
          console.log("response from page", response);
          addLinkToTarget()
        });
      });
    }

function addLinkToTarget() {
    const target = document.getElementById("search-target");
    const link = document.createElement("a");
    link.href = "#search-target";
    link.innerText = "Go to target";
    document.getElementById("links").appendChild(link);

}
