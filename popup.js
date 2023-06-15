document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("exportButton").addEventListener("click", function () {
    chrome.runtime.sendMessage({ action: "fetchViewingActivity" });
  });
});
