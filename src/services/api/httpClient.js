import axios from 'axios'
import { cacheAdapterEnhancer } from 'axios-extensions'

// const api_key = 'pa9!=rtw74$r#ww&lc^b53v-j1-(djhl$u!t%jrsp#1so*@dzl'

const cacheConfig = {
  enabledByDefault: false,
  cacheFlag: 'useCache'
}

const httpClient = axios.create({
  // baseURL: 'http://localhost:8000/api/v1.0/',
  baseURL: 'http://localhost/api/v1.0/',
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
    // anything you want to add to the headers
  },
  adapter: cacheAdapterEnhancer(axios.defaults.adapter, cacheConfig)
})

export default httpClient
