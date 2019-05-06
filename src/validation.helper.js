import { fetchSchema, lsGet } from 'utils/ls.js'

export function validateModel(type, data) {
  let valid = true;
  const gerbilerKey = lsGet('gerbiler')
  const schema = fetchSchema(gerbilerKey, type)
  const incomingAttributes = Object.keys(data)

  incomingAttributes.forEach( attr => {
    if (!schema.has.includes(attr) && !schema.fields.includes(attr)){
      valid = false
    }
  })

  return valid
}

export function validateSchema(schema) {
  let valid = true
  const tables = Object.keys(schema)

  tables.forEach( table => {
    if(!schema[table].fields){
      valid = false
    }
  })

  return valid
}

export function validateTableName(table){
  const gerbilerKey = lsGet('gerbiler')
  const tables = lsGet(`${gerbilerKey}_table_keys`)

  return tables && tables.includes(table)
}