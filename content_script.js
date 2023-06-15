chrome.runtime.sendMessage({ type: "fetchData" }, response => {
    if (response.success) {
      // Process the extracted data
      console.log(response.data);
    } else {
      console.log("Error fetching data");
    }
  });
  