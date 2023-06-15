chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "fetchData") {
      // Send a message to the content script to tell it to fetch the data
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {type: "fetchData"}, function(response) {
              // Save the data in local storage
              chrome.storage.local.set({ netflixData: response.data }, () => {
                  console.log("Data saved in local storage");
              });

              sendResponse({ success: true, data: response.data });
          });
      });

      return true; // Required for async sendResponse
  }
});
