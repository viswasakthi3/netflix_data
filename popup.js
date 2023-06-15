document.getElementById('extractData').addEventListener('click', function() {
    chrome.runtime.sendMessage({action: 'extractData'});
});
