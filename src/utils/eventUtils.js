export const getTargetIdentifier = (target) => {
  return (target = target.id ? target.id : target.name)
}

export const getTargetValue = (target) => {
  return (target = target.type === 'checkbox' ? target.checked : target.value)
}
