import { backendURL } from './constants';

async function PostJson(url, data) {
  let options = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  }
  return PostGeneral(url, options);
}

async function PostFormData(url, data) {
  let options = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: data
  }
  return PostGeneral(url, options);
}

async function PostGeneral(url, options) {
  if (url.charAt(0) == '/')
    url = backendURL + url;
  const response = await fetch(url, options);
  return response.json();
}

async function Get(url, options) {
  if (url.charAt(0) == '/')
    url = backendURL + url;
  return fetch(url, options)
    .then(response => response.json())
}

export { PostJson, PostFormData, Get };