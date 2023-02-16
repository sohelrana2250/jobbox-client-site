import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import auth from "./firebase/firebase.config";
import { getUser, setUser } from "./features/auth/authSlice";
import { Toaster } from 'react-hot-toast';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {

      if (user) {
        dispatch(setUser(user?.email));
        dispatch(getUser(user?.email));
      }

    })

  }, [dispatch])

  return (
    <>


      <Toaster />
      <RouterProvider router={routes} />


    </>
  );
}

export default App;
