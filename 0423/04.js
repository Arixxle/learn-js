$(document).ready(() => {
  let url = 'https://quality.data.gov.tw/dq_download_json.php?nid=9663&md5_url=5a0ea6b1b49db966e6a062273dcae2ed'
  //遇到問題 Access to XMLHttpRequest at 'https://quality.data.gov.tw/dq_download_json.php?nid=9663&md5_url=5a0ea6b1b49db966e6a062273dcae2ed' from origin 'http://127.0.0.1:5500' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
  axios.get(url).then((resp) => {
    console.log(resp);
  })

})