import React from 'react'

const CurrencyList = ({ listBase, listRate, updateList}) => {
  if (!listRate) return (<h4>Error</h4>);

  return (
    <div className="dropdown text-center">
			<h4>Base currency : </h4>
      <button type="button" className="btn btn-secondary dropdown-toggle mb-3" data-toggle="dropdown">{listBase}</button>
      <div className="dropdown-menu">
        {
          Object.keys(listRate).map((key) => <a className="dropdown-item" href="#" onClick={updateList} key={key}>{key}</a>)
        }
      </div>
    </div>
  )
}

export default CurrencyList;
