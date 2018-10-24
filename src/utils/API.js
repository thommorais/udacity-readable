import {headers} from '../enviroments'

// export function getPosts(){
//     return fetch(`${ api }posts`, {headers})
//       .then(res => res.json())
//       .catch(res => res)
// }

export function fetchPosts(url){

  return fetch(`${url}`, {headers})
      .then(res => res.json())
      .catch(res => res)
}


export function addPost(url, data = {}, method = 'POST'){

  const options = {
    method,
    headers,
    body: JSON.stringify(data)
  }

  return fetch(url, options)
  .then(res => res.json)
  .then(res => res)

}

