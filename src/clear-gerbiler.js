import { lsRm } from 'utils/ls.js'

export default function clear() {
  const localStorageItems = Object.keys(localStorageItems)

  localStorageItems.map( item => {
    if (item === 'gerbiler' || /\d{13}_table_keys/.test(item) || /\d{13}_\w+_schema/.test(item) ){
      lsRm(item)
    }
  })
}