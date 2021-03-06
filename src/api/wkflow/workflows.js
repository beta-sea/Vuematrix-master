import request from '@/myutil/request'

// 查询工作流列表
export function listWorkflows (data) {
  return request({
    url: '/wkflow/workflows/list',
    method: 'post',
    data: data
  })
}

// 查询工作流详细
export function getWorkflows (id) {
  return request({
    url: '/wkflow/workflows/' + id,
    method: 'get'
  })
}

// 新增工作流
export function addWorkflows (data) {
  return request({
    url: '/wkflow/workflows',
    method: 'post',
    data: data
  })
}

// 修改工作流
export function uptWorkflows (data) {
  return request({
    url: '/wkflow/workflows',
    method: 'put',
    data: data
  })
}

// 删除工作流
export function delWorkflows (ids) {
  return request({
    url: '/wkflow/workflows/' + ids,
    method: 'delete'
  })
}

// 导出工作流
export function exptWorkflows (data) {
  return request({
    url: '/wkflow/workflows/export',
    method: 'post',
    data: data
  })
}
