import React from 'react'

const DropDown = ({ rates }) => {
  if (!rates) return null;

  console.log(Object.entries(rates))

  return (
    <div>
      <div className="text-center d-flex inline-block ml-4 mb-2 dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown">USD</button>
        <div className="dropdown-menu">
          {
            Object.keys(rates).map((key) => <a className="dropdown-item" href="#">{key}</a>)
          }
        </div>
        <input type="number" className="form-control col-4 ml-2" placeholder="1.0000" />
      </div>

      <div className="text-center d-flex inline-block ml-4 dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown">HKG</button>
        <div className="dropdown-menu">
          <a className="dropdown-item" href="#">Action</a>
          <a className="dropdown-item" href="#">Another action</a>
          <a className="dropdown-item" href="#">Something else here</a>
        </div>
        <input type="number" className="form-control col-4 ml-2" placeholder="1.0000" />
      </div>
    </div>
  )
}

export default DropDown;
