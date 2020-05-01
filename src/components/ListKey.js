import React from 'react'

const ListKey = ({ rates }) => {
  if (!rates) return null;

  return (
    <div>
      {
        Object.keys(rates).map((key) => {
          return (
            <div className="rateColor" key={key}>{key}:</div>
          )
        })
      }
    </div>
  )
}

export default ListKey;
