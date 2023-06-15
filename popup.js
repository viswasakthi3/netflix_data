chrome.storage.local.get("netflixData", function(result) {
  console.log("Data retrieved from local storage:", result.netflixData);
});
