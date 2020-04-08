import axios from 'axios'
// import store from '@/stores'
import { message, notification, Modal } from 'ant-design-vue'
import { getToken } from './cookie'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: '/api',
  // 超时
  timeout: 10000
})
// request拦截器
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(res => {
  const code = res.data.code
  if (code === 401) {
    Modal.confirm({
      title: '系统提示',
      content: '登录状态已过期，您可以继续留在该页面，或者重新登录',
      onOk () {
        console.log('Ok')
      },
      onCancel () {
        console.log('Cancel')
      }
    })
  } else if (code !== 200) {
    notification.error({
      message: '操作失败',
      description: res.data.msg
    })
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject('error')
  } else {
    return res.data
  }
},
error => {
  console.log(error)
  message.error(error.message)
  return Promise.reject(error)
}
)

export default service
