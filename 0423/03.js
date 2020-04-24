$(document).ready(() => {

  let url = 'http://jsonplaceholder.typicode.com/posts/'

  console.log('Start!');
  axios.get(url)
       .then(function(resp) {
         console.log(resp);
        // let posts = resp.data
        // console.log(posts.map(post => toPostHtml(post)));
        // $('.container').append(posts.map(post => toPostHtml(post)));

        $('.container').append(resp.data.map(toPostHtml));
       })
  console.log('End!');
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