import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';
import {Admin_login_Service} from "../_apis_"
// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  }
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
});

AuthProvider.propTypes = {
  children: PropTypes.node
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const response = await axios.get('/api/account/my-account');
          const { user } = response.data;

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user
            }
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
   
  const res =  await Admin_login_Service.LoginAdmin({
    mobile_no:email,
    password:password
  });
    if(Object.keys(res.data.data).length>0 && res.data.code===200){
      const {user } = res.data.data;
      // console.log(JSON.stringify(res.data.data)+'fffffffffffffffffffffffffffffffffffffff')
      localStorage.setItem('Role', res.data.data.web_admin_role);
       localStorage.setItem('User', JSON.stringify({ UserIsLogged: true, userData: res.data.data }));
       localStorage.setItem('Token', JSON.stringify({useAuth:res.headers.authorization}));
       setTimeout(()=>{
        dispatch({
          type: 'LOGIN',
          payload: {
            user,
            isAuthenticated: true,
          }
        });
       },3000)
      
    }
  return(res);
  };

  const register = async (email, password, firstName, lastName) => {
    const response = await axios.post('/api/account/register', {
      email,
      password,
      firstName,
      lastName
    });
    const { accessToken, user } = response.data;

    window.localStorage.setItem('accessToken', accessToken);
    dispatch({
      type: 'REGISTER',
      payload: {
        user
      }
    });
  };

  const logout = async (Tokens,id) => {
    const res =  await Admin_login_Service.LogoutAdmin(Tokens,id);
    if(res.status===200 && res.data.code===200){
      localStorage.setItem('User', JSON.stringify({ UserIsLogged: false, userData:res.data }));
      localStorage.setItem('Token', JSON.stringify({useAuth:res.headers.authorization}));
      dispatch({ type: 'LOGOUT' });
    }
    else{
      localStorage.setItem('Token', JSON.stringify({useAuth:null}));
    }
 
 
  };

  const resetPassword =   () => {

  };

  const updateProfile = () => {};

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        
        login,
        logout,
        register,
        resetPassword,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
