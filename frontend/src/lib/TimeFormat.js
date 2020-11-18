export function formatTime(e) {
  const date = new Date(e)
  const now = new Date()
  let diff = (now.getTime() - date.getTime()) / 1000
  diff /= 60
  const minutes = Math.abs(Math.round(diff))
  if (minutes > 60) return `${Math.floor(minutes / 60)}h`
  else return `${minutes}m`
}