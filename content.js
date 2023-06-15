chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'fetchData') {
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

              sendResponse({success: true});
          })
          .catch(error => {
              console.error('Failed to fetch data', error);
              sendResponse({success: false});
          });

      return true;  // Will respond asynchronously.
  }
});
