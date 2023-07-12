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
  const token = localStorage.getItem('auth-token')
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
    if (errorStatusCode === 401) {
      handle401(error)
    } else {
      console.log(error)
      return Promise.reject(error)
    }
  },
)

export { baseURlApi, localURL }

/**********************************************/

function handle401(err) {
    localStorage.removeItem('auth-token')
    localStorage.removeItem('user')
    if (err?.config?.url?.includes('/auth/logout')) location.href = location.origin + '/login'
    else location.href = location.origin + '/login?redirect=' + location.pathname + location.search
}
