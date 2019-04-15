import genericsSerialize from '../generics'
import issueSerializer from './issue'

export default function issueBoxSerializer(target) {
  const serialize = resource => {
    return {
      id: resource.id,
      title: resource.name,
      tasks: issueSerializer(resource.issues)
    }
  }

  return genericsSerialize(target, serialize)
}
