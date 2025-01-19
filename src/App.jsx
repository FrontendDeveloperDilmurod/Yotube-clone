import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import YoutubeLayout from './layout/YoutubeLayout'
import Home from './pages/home/Home';
import { RouterProvider } from 'react-router';
import Error from './components/Error';
import Video from './pages/video/Video';
import Channels from './components/Channels';
import Login from './components/Login';

const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route path='/' element={<YoutubeLayout />}>
      <Route index element={<Home />} />
      <Route path='video/:categoryId/:videoId' element={<Video />} />
      <Route path='/channnels' element={<Channels />} />
      <Route path='login' element={<Login />} />
    </Route>
    <Route path='*' element={<Error />} />
  </Route>
))
const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
