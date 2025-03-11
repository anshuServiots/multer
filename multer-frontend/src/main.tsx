import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UploadPhotoPage } from './components/uploadPhoto.tsx'
import { GetPhotosPage } from './components/GetPhotosPage.tsx'
import { BrowserRouter , Routes , Route } from "react-router-dom";
import CreateAccount from './components/createAccount.tsx';
import UserLogin from './components/login.tsx';
import { ProtectedRoute } from './protectedRoutes.tsx';
import { GetAllPhotosPage } from './components/getAllPhotos.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>

    <Routes>
      <Route element={<ProtectedRoute />} >
      <Route path='/uploadPhoto' element={<UploadPhotoPage />} />
      <Route path='/getPhotos' index element={<GetPhotosPage />} />
      <Route path='/' element={<CreateAccount />} />
      <Route path='/login' element={<UserLogin />} />
      <Route path='/getAllPhotos' element={<GetAllPhotosPage />} />
      </Route>
    </Routes>

    </BrowserRouter>
    
  </StrictMode>,
)
