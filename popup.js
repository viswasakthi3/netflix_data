chrome.storage.local.get("netflixData", function(result) {
  console.log("Data retrieved from local storage:", result.netflixData);
});
document.getElementById("exportButton").addEventListener("click", function() {
  // Your code to execute when the button is clicked
});
