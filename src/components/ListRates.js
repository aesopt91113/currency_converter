import React from 'react'

const listRates = ({ rates }) => {
  if (!rates) return null;

  return (
    <div>
      {
        Object.keys(rates).map((key) => {
          return (
            <div className="rateColor" key={key}>{rates[key]}</div>
          )
        })
      }
    </div>
  )
}

export default listRates;
