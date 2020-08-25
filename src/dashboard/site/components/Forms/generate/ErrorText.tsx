import React from 'react'
interface Props {
  key: string
  errorMessage: string
  label: string
  min?: number
  max?: number
}

const errorText = (
  { key, errorMessage, label, min, max }: Props,
  { errors }
) => {
  const text = (
    <span style={{ color: 'red' }}>
      {errorMessage ? (
        errorMessage
      ) : (
        <React.Fragment>
          {errors[key] && `Error - ${label} requires`}
          {` atleast ${min ? min : 0}`}
          {max && min ? ' and' : ''}
          {` ${max ? ` at most ${max}` : ''}`}
        </React.Fragment>
      )}
    </span>
  )
  return errors[key] && text
}

export { errorText }
