import genericsSerialize from '../generics'
import labelSerializer from './label'

export default function issueSerializer(target) {
  const serialize = resource => {
    return {
      id: resource.id,
      title: resource.title,
      description: resource.description,
      estimateCount: resource.estimatePoint,
      resultCount: resource.resultPoint || 0,
      archived: resource.archived,
      labels: labelSerializer(resource.labels)
    }
  }

  return genericsSerialize(target, serialize)
}
