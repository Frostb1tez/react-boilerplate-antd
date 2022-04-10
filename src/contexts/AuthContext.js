import React, { createContext, useContext, useReducer } from 'react'
import { message, Skeleton } from 'antd'
import { useEffectOnce } from 'react-use'
import liff from '@line/liff'
import PropTypes from 'prop-types'

const Context = createContext(null)

const reducer = (prevState, actions) => {
  switch (actions.type) {
    case 'USER':
      return {
        ...prevState,
        user: actions.payload,
      }
    case 'LOADING':
      return {
        ...prevState,
        loading: actions.status,
      }
    default:
      throw new Error()
  }
}

const initialState = {
  user: {},
  loading: true,
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffectOnce(() => {
    const initLiff = () => {
      try {
        setTimeout(async () => {
          await liff.init({ liffId: process.env.REACT_APP_LIFF_ID })
          if (!liff.isLoggedIn()) {
            liff.login()
          }
        }, 200)
        liff.ready.then(async () => {
          const profile = await liff.getProfile()
          dispatch({ type: 'USER', payload: profile })
          dispatch({ type: 'LOADING', status: false })
        })
      } catch (e) {
        message.error('ERROR')
      }
    }
    initLiff()
    // dispatch({ type: 'LOADING', status: false })
  })

  if (state.loading) {
    return <Skeleton active />
  }

  return <Context.Provider value={{ state }}>{children}</Context.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useAuth = () => {
  const context = useContext(Context)
  if (!context) {
    throw new Error('useAuth should be use in side auth context')
  }
  return context
}
