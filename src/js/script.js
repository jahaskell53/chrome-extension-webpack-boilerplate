// import hello from "./popup/example";

// hello()
// alert("script pager")
// replaceText(document.body, "fire");
// console.log("script page");
// const bdy = document.body;
// export default function findText(word) {
//   replaceText(bdy, word);
// }

chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(async function (request) {
    console.log("request", request);
    // guard clause
    if (request.messageToLookFor !== undefined) {
      console.log("message to look for", request.messageToLookFor);
      console.log("back arrow window to find", window.find(request.messageToLookFor.split('\n')[0]));
      return;
    }

    // console.log(
    //   sender.tab
    //     ? "from a content script:" + sender.tab.url
    //     : "from the extension"
    // );
    // sendToServer(request.greeting).then((result) => {
    //   sendResponse({ farewell: result });
    // })
    var result = await sendToPythonServerGetResult(request.greeting, port);
    console.log("result pls", result);
    // send reponse to extension
    port.postMessage({ results: result });
  });
});

function replaceText(element, word) {
  if (element.hasChildNodes()) {
    //   console.log("element is ", element);
    element.childNodes.forEach((childNode) => replaceText(childNode, word));
  } else if (element.nodeType === Text.TEXT_NODE) {
    // console.log("Element is", element);
    if (element.textContent.includes(word)) {
      console.log("Red element is", element);
      setToRed(element);
      setIdOfElement(element, "search-target");
      element.parentNode.scrollIntoView(true);
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

async function sendToPythonServerGetResult(text) {
  // sends text to  server
  const response = await fetch("http://127.0.0.1:8000/send/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: text, url: document.URL }),
  });
  console.log("url", document.URL);
  // response.then(async function (data) {
  //   console.log(data.json());
  const resultsArray = await response.json();
  console.log("response from server", resultsArray.test);
  // replaceText(document.body, data1.test.slice(0, 10));
  console.log(
    "was message found: ",
    window.find(resultsArray.test[0].split("\n")[0])
  );
  return resultsArray.test;
  // for (let i = 10; i > 0; i--) {
  //   console.log("substring", i*5)
  //   if (window.find(data1.test.slice(0, i * 5))) {
  //     console.log(`was message found at substring: ${i * 5}`);
  //   }
  // }
  // });
  // }).then(function (data3) {
  //   return data3
  // });
}

function setToRed(element) {
  element.parentNode.style.backgroundColor = "red";
  console.log(element);
}
