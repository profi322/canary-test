var ports = [];
var last = null;

onconnect = function (e) {
  var port = e.ports[0];
  ports.push(port);
  if (last) port.postMessage(last);
  port.onmessage = function (ev) {
    last = ev.data;
    ports.forEach(function (p) {
      try { p.postMessage(ev.data); } catch (err) {}
    });
  };
};
