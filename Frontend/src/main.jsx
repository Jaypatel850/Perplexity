import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import route from "./app/routes/route.jsx";
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './app/app.store';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={route} />
    </Provider>
  </StrictMode>,
)
