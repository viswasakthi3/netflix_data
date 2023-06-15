document.getElementById('extractData').addEventListener('click', function() {
    chrome.runtime.sendMessage({action: 'extractData'});
});
chrome.storage.local.get("netflixData", function(result) {
    console.log("Data retrieved from local storage:", result.netflixData);
  });
  