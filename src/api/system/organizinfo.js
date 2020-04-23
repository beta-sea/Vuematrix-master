import request from '@/myutil/request'

// 查询机构信息列表
export function listOrganizinfo (data) {
  return request({
    url: '/sys/organizinfo/list',
    method: 'post',
    data: data
  })
}

// 查询机构信息详细
export function getOrganizinfo (id) {
  return request({
    url: '/sys/organizinfo/' + id,
    method: 'get'
  })
}

// 新增机构信息
export function addOrganizinfo (data) {
  return request({
    url: '/sys/organizinfo',
    method: 'post',
    data: data
  })
}

// 修改机构信息
export function uptOrganizinfo (data) {
  return request({
    url: '/sys/organizinfo',
    method: 'put',
    data: data
  })
}

// 删除机构信息
export function delOrganizinfo (ids) {
  return request({
    url: '/sys/organizinfo/' + ids,
    method: 'delete'
  })
}

// 导出机构信息
export function exptOrganizinfo (data) {
  return request({
    url: '/sys/organizinfo/export',
    method: 'post',
    data: data
  })
}