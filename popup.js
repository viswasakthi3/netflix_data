chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { type: "fetchData" }, function (response) {
      if (response.success) {
        console.log(response.data);
        chrome.storage.local.set({ netflixData: response.data }, () => {
          console.log("Data saved in local storage");
        });
      } else {
        console.log("Error fetching data");
      }
    });
  });
  
  chrome.storage.local.get("netflixData", function (result) {
    console.log("Data retrieved from local storage:", result.netflixData);
  });
  