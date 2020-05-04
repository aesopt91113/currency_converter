import React from 'react'

const DropDown = ({ rates, base, base2, quote1, quote2, amount1, finalAmount, changeBaseCurrency, changeSecondaryCurrency, conversion }) => {
  if (!rates) return null;

  return (
    <div>
      <h4 className="ml-4">Base Currency</h4>
      <div className="text-center d-flex inline-block ml-4 mb-2 dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown">{base}</button>
        <div className="dropdown-menu">
          {
            Object.keys(rates).map((key) => <a className="dropdown-item" href="#" onClick={changeBaseCurrency} key={key} >{key}</a>)
          }
        </div>
          <input type="number" className="form-control col-4 ml-2" placeholder={quote1} value={amount1} onChange={ (event) => conversion(event, true) }/>
      </div>

      <h4 className="ml-4">Secondary</h4>
      <div className="text-center d-flex inline-block ml-4 dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown">{base2}</button>
        <div className="dropdown-menu">
          {
            Object.keys(rates).map((key) => <a className="dropdown-item" href="#" onClick={changeSecondaryCurrency} key={key}>{key}</a>)
          }
        </div>
        <input type="number" className="form-control col-4 ml-2" placeholder={quote2} value={finalAmount} onChange={ (event) => conversion(event, false) } />
      </div>
    </div>
  )
}

export default DropDown;
