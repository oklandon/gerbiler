import showWarning from 'utils/show-warning.js'
import { lsSet }  from 'utils/ls.js'
import { ReplaySubject } from 'rxjs'
import { readAll } from 'src/api.js'

const PREF = Date.now()

lsSet('gerbiler', PREF)
var obs = {}

export default function bootstrap(schema) {
  const tables = Object.keys(schema)

  lsSet(`${PREF}_table_keys`, tables)

  if (!schema || !tables.length) {
    showWarning("Schema required")
  } else {
    return tables.map( tableName => {
      lsSet(`${PREF}_${tableName}_schema`, schema[tableName])
      lsSet(`${PREF}_${tableName}`, {})
      obs[tableName] = new ReplaySubject(1)
    })
  }
}

export function asOb$(table) {
  const list = readAll(table)
  if(list.length){
    updateOb(table, list)
  }

  return obs[table].asObservable()
}

export function updateOb(table, data) {
  obs[table].next(data)
}