import './App.css'
import {
  createBrowserRouter, 
  createRoutesFromElements,
  Route, 
  RouterProvider
} from 'react-router-dom'

import RootLayout from './layouts/RootLayout'
import PeopleList from './Component/PeopleList'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>
      <Route index element={<PeopleList/>}/>
    </Route>
  )
)



function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
