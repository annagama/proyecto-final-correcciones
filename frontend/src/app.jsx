import React from 'react';
import Header from './componente/headyfooter/head';
import Footer from './componente/headyfooter/footer';
import './app.css';
import LogIn from './componente/login/login';
import SignUp from './componente/login/singin';
import Cart from './componente/cart/cart';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DetailProduct from './componente/producto/detalleproduct';
import { useUserStore } from './tienda/user-tienda';
import Pedidos from './componente/pedido/pedido';
import ErrorPage from './componente/errorpag/error';
import UserCompra from './componente/compra/usercompra';


function App() {

  const current_user = useUserStore((state) => state);
  
  const RedirectToHome = () => <Navigate to="/" replace={true} />;

  console.log(current_user);
  
  return (
    <BrowserRouter>
      <>
        <Header />

        <Routes>         
          <Route path="/" element={<ProductList />} />
          
          {current_user.isLogged ? (
            <Route
              path="/login"
              element={<RedirectToHome />}
            />
          ) : (
            <Route path="/login" element={<LogIn />} />
          )}

          {current_user.isLogged ? (
            <Route
              path="/signup"
              element={<RedirectToHome />}
            />
          ) : (
            <Route path="/signup" element={<SignUp />} />
          )}

               
          
          <Route
            path="/carrito"
            element={
              current_user.isLogged ? (
                current_user.usuario.administrador ? (
                  <ErrorPage status={403} message={'Atención!! no posee acceso a esta pagina'}/>
                ) : (
                  <Cart />
                )
              ) : (
                <LogIn />
              )
            }
          />

          <Route
            path="/favorito"
            element={
              current_user.isLogged ? (
                current_user.usuario.administrador ? (
                  <ErrorPage status={403} message={'Atención!! no posee acceso a esta pagina'}/>
                ) : (
                  <Favorito />
                )
              ) : (
                <LogIn />
              )
            }
          />

          <Route
            path="/tuscompras"
            element={
              current_user.isLogged ? (
                current_user.usuario.administrador ? (
                  <ErrorPage status={403} message={'Atención!! no posee acceso a esta pagina'}/>
                ) : (
                  <UserCompra />
                )
              ) : (
                <LogIn />
              )
            }
          />


          <Route
            path="/backproduct"
            element={
              current_user.isLogged && current_user.usuario.administrador ? (
                <ProductBackOffice />
              ) : (
                <ErrorPage status={403} message={'Atención!! no posee acceso a esta pagina'}/>
              )
            }
          />

            
          <Route
            path="/nuevoproducto"
            element={
              current_user.isLogged && current_user.usuario.administrador ? (
                <NuevoProducto />
              ) : (
                <ErrorPage status={403} message={'Atención!! no posee acceso a esta pagina'}/>
              )
            }
          />


          
          <Route
            path="/pedidos"
            element={
              current_user.isLogged && current_user.usuario.administrador ? (
                <Pedidos />
              ) : (
                <ErrorPage status={403} message={'Atención!! no posee acceso a esta pagina'}/>
              )
            }
          />

          <Route path="/detail/:id" element={<DetailProduct />} />

          <Route path="*" element={<ErrorPage status={404} message={'La pagina no existe'} />} />
        </Routes>

        <Footer />
      </>
    </BrowserRouter>
  );
}

export default App;
