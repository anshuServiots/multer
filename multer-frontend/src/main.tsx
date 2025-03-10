import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UploadPhotoPage } from './components/uploadPhoto.tsx'
import { GetPhotosPage } from './components/GetPhotosPage.tsx'
import { BrowserRouter , Routes , Route } from "react-router-dom";



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/uploadPhoto' element={<UploadPhotoPage />} />
      <Route path='/getPhotos' element={<GetPhotosPage />} />
    </Routes>
    </BrowserRouter>
    
  </StrictMode>,
)
