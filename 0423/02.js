$(document).ready(() => {

  let url = 'http://jsonplaceholder.typicode.com/posts/'

  axios.get(url)
       .then(function(resp) {
        let firstId = resp.data[0].id
        let url2 = `http://jsonplaceholder.typicode.com/posts/${firstId}`
        return axios.get(url2)
       })
       .then(function(resp){
        console.log(resp.data)
        let html = toPostHtml(resp.data)
        console.log(html)
        $('.container').append(html)
      })
})

function toPostHtml(jsn) {
  return `
  <div>
    <h1><a href="post/${jsn.id}">ID: ${jsn.id}</a></h1>
    <h3>Title: ${jsn.title}</h3>
    <p class="some-body">${jsn.body}</p>
  </div>
  `;
}