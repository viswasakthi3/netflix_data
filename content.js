function extractData() {
    const viewingActivityData = [];
    const viewingActivityItems = document.querySelectorAll(".retableRow");
  
    viewingActivityItems.forEach((item) => {
      const title = item.querySelector(".title").innerText;
      const date = item.querySelector(".date").innerText;
  
      viewingActivityData.push({ title, date });
    });
  
    return viewingActivityData;
  }
  
  const data = extractData();
  console.log(data);
  