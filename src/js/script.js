import hello from "./popup/example";

// hello()
// alert("script pager")
// replaceText(document.body, "fire");
console.log("script page")
const bdy = document.body
export default function findText(word) {
    replaceText(bdy, word)
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
    sendToServer(request.greeting);
      if (request.greeting === "hello")
        sendResponse({farewell: "goodbye"});
    }
  );

function replaceText(element, word) {
    if (element.hasChildNodes()) {
    //   console.log("element is ", element);
      element.childNodes.forEach(childNode => replaceText(childNode, word));
    } else if (element.nodeType === Text.TEXT_NODE) {
        // console.log("Element is", element);
        if (element.textContent.includes(word)) {
            console.log("Red element is", element);
            setToRed(element)
            setIdOfElement(element, "search-target")
            element.parentNode.scrollIntoView(true)
            return;
        }
        // element.textContent = element.textContent.replace(/chrome/gi, "-----");
    //   if (element.innerHTML.includes("Chrome")) {
    //     setToRed(element);
    //     console.log("Red element is", element);
    //   }
    }
  }

  function setIdOfElement(element, id) {
    element.parentNode.id = id;
    // console.log(element);
  }

  function sendToServer(text) {
      // sends text to  server
    const response = fetch("http://127.0.0.1:8000/send/", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({query: text, url: document.URL}),
        });
        console.log("url", document.URL)
        response.then(data => {
        
        //   console.log(data.json());
          data.json().then(data1 => {
            console.log("response from server", data1.test.slice(0, 10));
            replaceText(document.body, data1.test.slice(0, 10));
          })
        
        
        })
  }
  
  function setToRed(element) {
    element.parentNode.style.backgroundColor = "red";
    console.log(element);
  }