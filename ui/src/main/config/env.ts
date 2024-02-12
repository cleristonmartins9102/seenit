export const env = {
  httpAddress: process.env.BACKEND_ADDRESS || 'https://app.coplandpost.com/api',
  // httpAddress: process.env.BACKEND_ADDRESS || 'http://10.0.1.178:8081/api',
  socketAddress: process.env.SOCKED_ADDRESS || 'http://127.0.0.1:5051',
  currentIpGeolocation: 'https://app.coplandpost.com/api/geolocation/get/byip',
  defaultErrorMessage: "Sorry, we're currently experiencing technical difficulties. Please check back again shortly.",
  bucketArt: 'coplandpost-customer-arts'
}
