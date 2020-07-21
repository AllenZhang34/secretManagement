import request from '@/utils/request'

export function fetchAppUserList(query) {
  return request({
    url: '/vue-element-template/appusermanagement/list',
    method: 'get',
    params: query
  })
}

export function fetchAppUser(id) {
  return request({
    url: '/vue-element-template/appusermanagement/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-template/appusermanagement/pv',
    method: 'get',
    params: { pv }
  })
}

export function createAppUser(data) {
  return request({
    url: '/vue-element-template/appusermanagement/create',
    method: 'post',
    data
  })
}

export function updateAppUser(data) {
  return request({
    url: '/vue-element-template/appusermanagement/update',
    method: 'post',
    data
  })
}

export function deleteAppUser(id) {
  return request({
    url: `/vue-element-template/appusermanagement/${id}`,
    method: 'delete'
  })
}
