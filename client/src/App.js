import { Fragment } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Axios from "axios";
import { AppProvider } from "./context";
import AuthRoute from "./utils/AuthRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Register from "./pages/Register";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";


// Axios.defaults.baseURL = process.env.REACT_APP_BASE_URL + "/api"
Axios.defaults.baseURL = "/api";
Axios.defaults.withCredentials = true;
Axios.defaults.headers.common["Authorization"] = window.localStorage.token
  ? `Bearer ${window.localStorage.token}`
  : undefined;
function App() {
  return (
    <Fragment>
      <Router>
        <AppProvider>
          <div className="flex justify-between flex-col min-h-screen bg-gray-200">
            <Navbar />

            <div className="my-4 md:max-w-5xl m-auto px-4 ">
              <Switch>
                <Route path="/" exact={true} component={Home} />
                <Route path="/about" exact={true} component={About} />
                <Route path="/contact" exact={true} component={Contact} />
                <Route path="/login" exact={true} component={Login} />

                <Route path="/register" exact={true} component={Register} />
                <Route path="/user/:userId" exact={true} component={Profile} />
                 <Route path="/post/view/:postId" exact={true} component={Post} />
                <AuthRoute>
                  <Route
                    path="/post/create"
                    exact={true}
                    component={CreatePost}
                  />

                   <Route
                    path="/post/edit/:postId"
                    exact={true}
                    component={EditPost}
                  />
                </AuthRoute>

               

              </Switch>
            </div>

            <Footer />
          </div>
        </AppProvider>
      </Router>
    </Fragment>
  );
}

export default App;
