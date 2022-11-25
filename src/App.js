import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './Routes/router';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className='container mx-auto'>
      <RouterProvider router={router}></RouterProvider>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
