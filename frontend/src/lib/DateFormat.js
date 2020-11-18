export function handleDate(e) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  const date = new Date(e)
  const formattedDate = date.toLocaleDateString('en-GB', options)
  return formattedDate
}