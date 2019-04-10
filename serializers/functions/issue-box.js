import genericsSerialize from '../generics'

export default function issueBoxSerializer(target) {
  const serialize = resource => {
    return {
      id: resource.id,
      name: resource.name
    }
  }

  return genericsSerialize(target, serialize)
}
