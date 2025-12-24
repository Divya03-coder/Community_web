import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/Pages/Signin";
import Signup from "./components/Pages/Signup";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import PrivateRoute from "./components/Routes/PrivateRoute";
import CommunityAbout from "./components/Home/CommunityAbout";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./components/redux/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  return (
    <BrowserRouter>

      <Routes>
        {/* 🏠 Home */}
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        {/* 🔐 Sign In */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup/>}/>
           <Route
        path="/community/:slug"
        element={
          <PrivateRoute>
            <Layout>
            <CommunityAbout />
            </Layout>
          </PrivateRoute>
        }
      />
    
      </Routes>
    </BrowserRouter>
  );
}

export default App;
