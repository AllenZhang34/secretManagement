import request from '@/utils/request'

export function fetchAppList(query) {
  return request({
    url: '/vue-element-template/appmanagement/list',
    method: 'get',
    params: query
  })
}

export function fetchApp(id) {
  return request({
    url: '/vue-element-template/appmanagement/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-template/appmanagement/pv',
    method: 'get',
    params: { pv }
  })
}

export function createApp(data) {
  return request({
    url: '/vue-element-template/appmanagement/create',
    method: 'post',
    data
  })
}

export function updateApp(data) {
  return request({
    url: '/vue-element-template/appmanagement/update',
    method: 'post',
    data
  })
}

export function deleteApp(id) {
  return request({
    url: `/vue-element-template/appmanagement/${id}`,
    method: 'delete'
  })
}
