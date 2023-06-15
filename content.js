function fetchAndParseData() {
    // This function will be stringified and injected into the content page.
    // It cannot reference any variables outside its scope.
    const rows = document.querySelectorAll(".retableRow");
    const data = [];

    rows.forEach(row => {
        const dateElement = row.querySelector(".col.date");
        const titleElement = row.querySelector(".col.title a");

        if (dateElement && titleElement) {
            const date = dateElement.textContent.trim();
            const title = titleElement.textContent.trim();

            data.push({ date, title });
        }
    });

    chrome.storage.local.set({netflixData: data}, function() {
        console.log('Data saved in local storage');
    });
}

// Listen for a message from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'fetchData') {
        fetchAndParseData();
        sendResponse({success: true});
    }
});
