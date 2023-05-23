import axios from 'axios'
const baseURlApi = axios.create({
  baseURL: import.meta.env.VITE_API_LOCAL_URL,
})

const localURL = axios.create({
  baseURL: import.meta.env.VITE_API_LOCAL_URL,
})

baseURlApi.defaults.headers = {
  'Cache-Control': 'no-cache',
  Pragma: 'no-cache',
  Expires: '0',
}

/* TODO : API Request with Token */
baseURlApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('budtoken')
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token
  }

  return config
})

// TODO : Remove LocalURL after Backend update
localURL.interceptors.request.use((config) => {
  const token = localStorage.getItem('budtoken')
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token
  }

  return config
})

baseURlApi.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    const errorStatusCode = error.response.status
    if (errorStatusCode === 403 || errorStatusCode === 404) {
      //   TODO: Redirect logic with 403 and 404
    } else {
      console.log(error)
      return Promise.reject(error)
    }
  },
)

export { baseURlApi, localURL }
