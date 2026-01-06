// SOAP WebService 代理服務器
// 用於解決 CORS 跨域問題
// 使用方法: node proxy-server.js

const http = require('http');
const https = require('https');
const url = require('url');

const PORT = 3000;
const TARGET_URL = 'https://chinbs.chi.com.tw/WebService/CAPInteropService.asmx';

const server = http.createServer((req, res) => {
  // 設置 CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, SOAPAction');

  // 處理 OPTIONS 預檢請求
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // 只處理 POST 請求
  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
    return;
  }

  // 讀取請求體
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    // 解析目標 URL
    const targetUrl = url.parse(TARGET_URL);
    const isHttps = targetUrl.protocol === 'https:';
    const requestModule = isHttps ? https : http;
    
    // 構建請求選項
    const options = {
      hostname: targetUrl.hostname,
      port: targetUrl.port || (isHttps ? 443 : 80),
      path: targetUrl.path,
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'Content-Length': Buffer.byteLength(body),
        'SOAPAction': req.headers['soapaction'] || req.headers['SOAPAction'] || ''
      }
    };

    // 發送請求到目標服務器
    const proxyReq = requestModule.request(options, (proxyRes) => {
      // 設置響應 headers
      res.writeHead(proxyRes.statusCode, {
        'Content-Type': proxyRes.headers['content-type'] || 'text/xml; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      });

      // 轉發響應數據
      proxyRes.on('data', (chunk) => {
        res.write(chunk);
      });

      proxyRes.on('end', () => {
        res.end();
      });
    });

    proxyReq.on('error', (error) => {
      console.error('代理請求錯誤:', error);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Proxy Error: ' + error.message);
    });

    // 發送請求體
    proxyReq.write(body);
    proxyReq.end();
  });
});

server.listen(PORT, () => {
  console.log(`代理服務器運行在 http://localhost:${PORT}`);
  console.log(`目標服務器: ${TARGET_URL}`);
  console.log('\n請在 HTML 文件中將 WebService URL 改為: http://localhost:3000');
});

