import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vue-element-template/usermanagement/list',
    method: 'get',
    params: query
  })
}

export function fetchUser(id) {
  return request({
    url: '/vue-element-template/usermanagement/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-template/usermanagement/pv',
    method: 'get',
    params: { pv }
  })
}

export function createUser(data) {
  return request({
    url: '/vue-element-template/usermanagement/create',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/vue-element-template/usermanagement/update',
    method: 'post',
    data
  })
}

export function deleteUser(id) {
  return request({
    url: `/vue-element-template/usermanagement/${id}`,
    method: 'delete'
  })
}
