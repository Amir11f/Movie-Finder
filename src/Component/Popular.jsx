import React from 'react'
import PeopleList from './PeopleList'


function Popular() {
  return (
    <div>
        <header>
            <p className="pageHeader">Popular People</p>
        </header>

        <main>
          <div className="poepleListDiv">
            <PeopleList/>
          </div>
        </main>
    </div>
  )
}

export default Popular