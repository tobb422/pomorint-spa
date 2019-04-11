import genericsSerialize from '../generics'

export default function issueBoxSerializer(target) {
  const serialize = resource => {
    return {
      id: resource.id,
      title: resource.name,
      tasks: []
    }
  }

  return genericsSerialize(target, serialize)
}
