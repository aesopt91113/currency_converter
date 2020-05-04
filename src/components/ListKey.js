import React from 'react'

const ListKey = ({ listRate }) => {
  if (!listRate) return null;

  return (
    <div>
      {
        Object.keys(listRate).map((key) => {
          return (
            <div className="rateColor" key={key}>{key}:</div>
          )
        })
      }
    </div>
  )
}

export default ListKey;
