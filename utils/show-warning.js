export default function showWarning(message) {
  if(typeof console !== "undefined") {
    console.error(message)
  }

  try {
    throw new Error(message)
  } catch(evt) {
    //something else
  }
}