import "../css/popup.css";
import hello from "./popup/example";
import findText from "./script";

// hello();
document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const text = document.getElementById("input").value;
  console.log(text);
  document.getElementById("input").value = "";
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {

    // since only one tab should be active and in the current window at once
    // the return variable should only have one entry
    var activeTab = tabs[0];
    var activeTabId = activeTab.id; // or do whatever you need

    const port = chrome.tabs.connect(activeTabId);
  
    sendMsg(text, port);
    // add event listener
    setupEventListener(port);

 });
  
});

function setupEventListener(port) {
  port.onMessage.addListener(function (response) {
    console.log("response from page", response);
    // addLinkToTarget();

    var currIndex = 0;
    document.getElementById("down-arrow").addEventListener("click", () => {
      console.log("was clicked");
      // chrome.tabs.query({ active: true, currentWindow: true }, (tabs2) => {
      currIndex++;
      // i believe response is undefined, and im not sure why
      console.log("response first", response);
      // i think we need to set up a socket to send message back and forth
      // do we really need to send message twice? can we use the original sendMessage function?
      // chrome.tabs.sendMessage(
      //   tabs2[0].id,
      //   { messageToLookFor: response },
      //   () => null
      // );
      console.log("message to look for", response.results[currIndex]);
      port.postMessage({ messageToLookFor: response.results[currIndex] });
      // });
    });
  });
}

function sendMsg(text, port) {
  // is first sent when the query is made at the beginning
  // opens port

  // sends first message
  port.postMessage({ greeting: text });

  // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  // chrome.tabs.sendMessage(
  //   tabs[0].id,
  //   { greeting: text },
  // this callback is called after the openai query is made, and this callback sets up a listener for the down buttone vent

  //   );
  // });
}

function addLinkToTarget() {
  const target = document.getElementById("search-target");
  const link = document.createElement("a");
  link.href = "#search-target";
  link.innerText = "Go to target";
  document.getElementById("links").appendChild(link);
}
