import React from 'react'

const ListRates = ({ listRate }) => {
  if (!listRate) return null;

  return (
    <div>
      {
        Object.keys(listRate).map((key) => {
          return (
            <div className="rateColor" key={key}>{listRate[key]}</div>
          )
        })
      }
    </div>
  )
}

export default ListRates;
