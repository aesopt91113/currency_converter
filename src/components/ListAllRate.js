import React from 'react'

const ListAllRate = ({ rates }) => {
  if (!rates) return null;

  return (
    <div>
      {
        Object.keys(rates).map((key) => {
          return (
            <div key={key}>{key}: {rates[key]}</div>
          )
        })
      }
    </div>
  )
}

export default ListAllRate;
