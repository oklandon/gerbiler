import showWarning from 'utils/show-warning.js'
import { lsSet, lsGet } from 'utils/ls.js'
import { validateModel } from 'src/validation.helper.js'
import { updateOb } from 'src/bootstrap.js'

function publish(type){
  updateOb(
    type,
    readAll(type)
  )
}


export function create(type, data, existingId = null){
  const gerbilerKey = lsGet('gerbiler')
  let newId = existingId || nextId(type)
  if (!validateModel(type, data)){
    showWarning(`invalid properties found for type: ${type}`)
    return false
  } else {
    const table = `${gerbilerKey}_${type}`
    lsSet(
      table,
      {
        ...lsGet(table),
        [newId]: data
      }
    )

    publish(type)
    return true
  }
}

export function showTables() {
  return lsGet(
    `${lsGet('gerbiler')}_table_keys`
  )
}

export function readAll(type){
  const full = lsGet(
    `${lsGet('gerbiler')}_${type}`
  )

  return Object.keys(full).reduce((acc, curr) =>
    [...acc, full[curr]],
  [])
}

export function read(type, id){
  return lsGet(
    `${lsGet('gerbiler')}_${type}`
  )[id]
}

export function update(type, data, id){
  destroy(type, id)
  create(type, data, id)
}

export function destroy(type, id){
  const gerbilerKey = lsGet('gerbiler')
  const table = `${gerbilerKey}_${type}`
  let existingSet = lsGet(table)
  delete existingSet[id]

  lsSet(
    table,
    existingSet
  )

  publish(type)
}

function nextId(type){
  return Object.keys(
    lsGet(type)
  ).length
}
