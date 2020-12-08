window.addEventListener("locationchange", function() {
  let location = window.location.href;
  fetch("https://9hp43o3p3k.execute-api.us-east-2.amazonaws.com/dev/task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({ location: location })
  })
    .then(res => {
      console.log("Request complete! response:");
      return res.json();
    })
    .then(data => {
      console.log(data);
    });
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
