import showWarning from 'utils/show-warning.js'

export function unsupported(){
  return showWarning('localStorage undefined. Gerbiler does not support this browser')
}

export function lsSet(key, value) {
  if (localStorage) {
    return localStorage.setItem(key,value)
  } else {
    return unsuppported()
  }
}

export function lsGet(key) {
  if (localStorage) {
    return localStorage.getItem(key)
  } else {
    unsuppported()
  }
}

export function lsRm(key) {
  if (localStorage) {
    return localStorage.removeItem(key)
  } else {
    unsuppported()
  }
}

