const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  swSrc: 'service-worker.js',
})

module.exports = withPWA({
  // next.js config
  reactStrictMode: true,
})
