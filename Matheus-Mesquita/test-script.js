const http = require('http');
const fs = require('fs');
const html = `
<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 20px; font-family: sans-serif; background: #333; color: white; }
  .modal { width: 800px; height: 600px; border: 2px solid #0ff; background: #000; margin: auto; position: relative; }
  iframe { width: 100%; height: 100%; border: none; }
</style>
</head>
<body>
    <h2>Test Iframe</h2>
    <div class="modal">
        <iframe src="https://www.behance.net/embed/project/244510005?ilo0=1" sandbox="allow-scripts allow-same-origin"></iframe>
    </div>
</body>
</html>
`;
fs.writeFileSync('test-iframe.html', html);
