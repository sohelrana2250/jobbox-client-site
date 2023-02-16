
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logoutRedux } from "../../features/auth/authSlice";
import { signOut } from "firebase/auth";
import auth from "../../firebase/firebase.config";

const Navbar = () => {
  const { pathname } = useLocation();

  const dispatch = useDispatch();
  const { LogOut, user, employerData } = useSelector((state) => state.auth);

  const { email, role } = user;

  console.log(employerData);

  // console.log(role);

  console.log(user);

  const handelLogout = () => {

    signOut(auth).then(() => {
      dispatch(logoutRedux())
    }).catch((error) => {
      console.log(error.message);
    })
  }






  console.log(LogOut)

  return (
    <nav
      className={`h-14 fixed w-full z-[999] ${pathname === "/" ? null : "bg-white"
        }`}
    >
      <ul className='max-w-7xl mx-auto flex gap-3 h-full items-center'>
        <li className='flex-auto font-semibold text-2xl'>
          <Link to='/'>JobBox</Link>
        </li>
        <li>
          <Link className='hover:text-primary' to='/jobs'>
            Jobs
          </Link>
        </li>

        {email ? <>

          <button onClick={() => handelLogout()} className="hover:text-red-600 font-bold">Log-Out </button>


          <li>
            <Link
              className='border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all '
              to='/dashboard'
            >
              Dashboard
            </Link>
          </li>
        </> : <>
          <li>
            <Link
              className='border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all '
              to='/login'
            >
              Login
            </Link>
          </li>


        </>}




        {

          email && role && <>

            <li>
              <Link
                className='border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all '
                to='/register'
              >
                Register
              </Link>
            </li>

          </>


        }





      </ul>
    </nav>
  );
};

export default Navbar;
