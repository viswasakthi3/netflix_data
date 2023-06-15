chrome.runtime.sendMessage({ type: "fetchData" }, response => {
  if (response.success) {
    // Process the extracted data
    console.log(response.data);
    chrome.storage.local.set({ netflixData: response.data }, () => {
      console.log("Data saved in local storage");
    });
  } else {
    console.log("Error fetching data");
  }
});
