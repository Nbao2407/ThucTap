import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes*/}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />

            {/* Nested Routes*/}
            <Route path="products" element={<ProtectedRoute><Outlet /></ProtectedRoute>}>
              <Route index element={<ProductList />} />
              <Route path=":id" element={<ProductDetail />} />
            </Route>

            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
