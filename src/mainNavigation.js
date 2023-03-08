import { Helmet } from 'react-helmet';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/home';
import Details from './pages/detail';

const MainNavigation = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/detail' element={<Details />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default MainNavigation