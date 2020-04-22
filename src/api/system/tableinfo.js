import request from '@/myutil/request'

// 查询代码生成业务列表
export function listTableinfo (data) {
  return request({
    url: '/sys/tableinfo/list',
    method: 'post',
    data: data
  })
}

// 查询代码生成业务详细
export function getTableinfo (id) {
  return request({
    url: '/sys/tableinfo/' + id,
    method: 'get'
  })
}

// 新增代码生成业务
export function addTableinfo (data) {
  return request({
    url: '/sys/tableinfo',
    method: 'post',
    data: data
  })
}

// 修改代码生成业务
export function uptTableinfo (data) {
  return request({
    url: '/sys/tableinfo',
    method: 'put',
    data: data
  })
}

// 删除代码生成业务
export function delTableinfo (ids) {
  return request({
    url: '/sys/tableinfo/' + ids,
    method: 'delete'
  })
}

// 导出代码生成业务
export function exptTableinfo (data) {
  return request({
    url: '/sys/tableinfo/export',
    method: 'post',
    data: data
  })
}
