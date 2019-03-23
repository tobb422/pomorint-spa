export default function genericsSerialize(target, serialize) {
  const isArray = Array.isArray(target)
  return isArray ? target.map(t => serialize(t)) : serialize(target)
}
