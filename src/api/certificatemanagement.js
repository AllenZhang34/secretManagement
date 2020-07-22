import request from '@/utils/request'

export function fetchCertificateList(query) {
  return request({
    url: '/vue-element-template/certificatemanagement/list',
    method: 'get',
    params: query
  })
}

export function createCertificate(data) {
  return request({
    url: '/vue-element-template/certificatemanagement/create',
    method: 'post',
    data
  })
}

export function updateCertificate(data) {
  return request({
    url: '/vue-element-template/certificatemanagement/update',
    method: 'post',
    data
  })
}
