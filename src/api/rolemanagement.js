import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/vue-element-template/rolemanagement/routes',
    method: 'get'
  })
}

export function getRoles() {
  return request({
    url: '/vue-element-template/rolemanagement/roles',
    method: 'get'
  })
}

export function createRole(data) {
  return request({
    url: '/vue-element-template/rolemanagement/create',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: '/vue-element-template/rolemanagement/update',
    method: 'post',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/vue-element-template/rolemanagement/${id}`,
    method: 'delete'
  })
}
