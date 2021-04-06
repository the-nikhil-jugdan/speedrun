import React from 'react'
import { Navbar} from 'react-materialize'

export default function index ()  {
  return (
    <Navbar
      brand={
        <div>Speedrun</div>
      }
      menuIcon={null}
      centerLogo={true}
    />
  )
}
