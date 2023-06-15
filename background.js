chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'extractData') {
        fetch('https://www.netflix.com/viewingactivity')
            .then(response => response.text())
            .then(htmlString => {
                const $ = jQuery.parseHTML(htmlString);
                const rows = $(".retableRow");
                const data = [];

                rows.each((index, row) => {
                    const dateElement = $(row).find(".col.date");
                    const titleElement = $(row).find(".col.title a");

                    if (dateElement && titleElement) {
                        const date = dateElement.text().trim();
                        const title = titleElement.text().trim();

                        data.push({ date, title });
                    }
                });

                chrome.storage.local.set({netflixData: data}, function() {
                    console.log('Data saved in local storage');
                });
            });
    }
});
