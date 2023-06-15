chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'fetchData') {
      chrome.tabs.query({active: true, currentWindow: true}, tabs => {
          chrome.tabs.sendMessage(tabs[0].id, {type: 'fetchData'}, response => {
              if (response.success) {
                  console.log('Data fetched successfully');
              } else {
                  console.log('Failed to fetch data');
              }
          });
      });

      return true;  // Will respond asynchronously.
  }
});
