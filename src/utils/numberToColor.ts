export default function numberToColor(n: number) {
  return `#${n.toString(16).padStart(6, "0")}`
}
