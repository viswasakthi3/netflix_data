chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'fetchData') {
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            chrome.scripting.executeScript({
                target: {tabId: tabs[0].id},
                function: fetchAndParseData
            }, results => {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError);
                    sendResponse({success: false});
                } else {
                    console.log('Data fetched successfully');
                    sendResponse({success: true});
                }
            });
        });

        return true;  // Will respond asynchronously.
    }
});

function fetchAndParseData() {
    // This function will be stringified and injected into the content page.
    // It cannot reference any variables outside its scope.
    fetch('https://www.netflix.com/viewingactivity')
        .then(response => response.text())
        .then(htmlString => {
            const parser = new DOMParser();
            const htmlDocument = parser.parseFromString(htmlString, "text/html");
            const rows = htmlDocument.querySelectorAll(".retableRow");
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
        })
        .catch(error => {
            console.error('Failed to fetch data', error);
        });
}
