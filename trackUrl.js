window.addEventListener("locationchange", function() {
  // let location = window.location.href;
  let params = new URLSearchParams(window.location.search);
  let aidVal = params.get("aid");
  if (aidVal != undefined && aidVal != "" && aidVal != null) {
    fetch(
      "https://kyeqluec27.execute-api.us-east-1.amazonaws.com/dev/lead/receiveAID",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ aid: aidVal })
      }
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
      });
  }
});
history.pushState = (f =>
  function pushState() {
    var ret = f.apply(this, arguments);
    window.dispatchEvent(new Event("pushstate"));
    window.dispatchEvent(new Event("locationchange"));
    return ret;
  })(history.pushState);

history.replaceState = (f =>
  function replaceState() {
    var ret = f.apply(this, arguments);
    window.dispatchEvent(new Event("replacestate"));
    window.dispatchEvent(new Event("locationchange"));
    return ret;
  })(history.replaceState);

window.addEventListener("popstate", () => {
  window.dispatchEvent(new Event("locationchange"));
});
