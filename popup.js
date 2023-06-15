document.getElementById('button').addEventListener('click', () => {
  chrome.runtime.sendMessage({type: 'fetchData'}, response => {
      if (response.success) {
          console.log('Data fetched successfully');
      } else {
          console.log('Failed to fetch data');
      }
  });
});
