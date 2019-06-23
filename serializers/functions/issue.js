import genericsSerialize from '../generics'
import labelSerializer from './label'

export default function issueSerializer(target) {
  return genericsSerialize(target, resource => {
    return {
      id: resource.id,
      title: resource.title,
      description: resource.description,
      estimateCount: resource.estimatePoint,
      resultCount: resource.resultPoint || 0,
      boxIndex: resource.boxIndex,
      archived: resource.archived,
      labels: labelSerializer(resource.labels)
    }
  })
}
