document.getElementById('fetchButton').addEventListener('click', () => {
    chrome.runtime.sendMessage({type: 'fetchData'}, response => {
        if (response.success) {
            console.log('Data fetched successfully');
        } else {
            console.error('Failed to fetch data');
        }
    });
});
