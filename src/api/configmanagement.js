import request from '@/utils/request'

export function getConnectSystemList(query) {
  return request({
    url: '/vue-element-template/configmanagement/connectSystemList',
    method: 'get',
    params: query
  })
}

export function getAppTypeList(query) {
  return request({
    url: '/vue-element-template/configmanagement/appTypeList',
    method: 'get',
    params: query
  })
}

export function getCipherMachineList(query) {
  return request({
    url: '/vue-element-template/configmanagement/cipherMachineList',
    method: 'get',
    params: query
  })
}

export function createConnectSystem(data) {
  return request({
    url: '/vue-element-template/configmanagement/createConnectSystem',
    method: 'post',
    data
  })
}
export function createAppType(data) {
  return request({
    url: '/vue-element-template/configmanagement/createAppType',
    method: 'post',
    data
  })
}

export function createCipherMachine(data) {
  return request({
    url: '/vue-element-template/configmanagement/createCipherMachine',
    method: 'post',
    data
  })
}

export function updateConnectSystem(data) {
  return request({
    url: '/vue-element-template/configmanagement/updateConnectSystem',
    method: 'post',
    data
  })
}

export function updateAppType(data) {
  return request({
    url: '/vue-element-template/configmanagement/updateAppType',
    method: 'post',
    data
  })
}

export function updateCipherMachine(data) {
  return request({
    url: '/vue-element-template/configmanagement/updateCipherMachine',
    method: 'post',
    data
  })
}

export function deleteConnectSystem(data) {
  return request({
    url: '/vue-element-template/configmanagement/deleteConnectSystem',
    method: 'post',
    data
  })
}

export function deleteAppType(data) {
  return request({
    url: '/vue-element-template/configmanagement/deleteAppType',
    method: 'post',
    data
  })
}

export function deleteCipherMachine(data) {
  return request({
    url: '/vue-element-template/configmanagement/deleteCipherMachine',
    method: 'post',
    data
  })
}
