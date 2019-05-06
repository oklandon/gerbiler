import showWarning from 'utils/show-warning.js'
import { lsSet, lsGet, lsRm }  from 'utils/ls.js'

export const PREF = Date.now()

export default function bootstrap(schema) {
  const tables = Object.keys(schema)

  lsSet(`${PREF}_table_keys`)

  if (!schema || !tables.length) {
    showWarning("Schema required")
  } else {
    tables.map( tableName =>
      lsSet(`${PREF}_${tableName}_schema`, schema[tableName])
    )
  }
}