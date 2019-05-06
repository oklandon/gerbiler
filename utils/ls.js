import showWarning from 'utils/show-warning.js'

function unsupported(){
  return showWarning('localStorage undefined. Gerbiler does not support this browser')
}

export function lsSet(key, value) {
  if (localStorage) {
    return localStorage.setItem(key,value)
  } else {
    return unsupported()
  }
}

export function lsGet(key) {
  if (localStorage) {
    return localStorage.getItem(key)
  } else {
    unsupported()
  }
}

export function lsRm(key) {
  if (localStorage) {
    return localStorage.removeItem(key)
  } else {
    unsupported()
  }
}

export function fetchSchema(gerbilerKey, type) {
  return lsGet(`${gerbilerKey}_${type}_schema`)
}

