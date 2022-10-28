import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth'
import { useRouter } from 'next/router'
import { createContext, FC, ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { auth } from '../../firebase'

export const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  authError: null,
  logoutError: null,
  loading: false,
})

interface AuthProviderProps {
  children: ReactNode | undefined;
}

interface IAuth {
  user: User | null
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  authError: string | null
  logoutError: string | null
  loading: boolean
}

const AuthProvider:FC<AuthProviderProps> = ({ children }) => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [logoutError, setLogoutError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const signUp = async (email: string, password: string) => {
    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        setUser(user);
        router.push('/');
        setAuthError(null);
      })
      .catch((e) => {
        alert(e.message)
        setAuthError(e.message)
      })
      .finally(() => setLoading(false))
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true)

    signInWithEmailAndPassword(auth, email, password)
      .then(({user}) => {
        setUser(user)
        router.push('/');
        setAuthError(null);
      })
      .catch((e) => {
        alert(e.message)
        setAuthError(e.message)
      })
      .finally(() => setLoading(false))
  };

  const logout = async () => {
    setLoading(true)
    signOut(auth)
      .then(() => {
        setUser(null)
        setLogoutError(null)
      })
      .catch((e) => {
        alert(e.message)
        setLogoutError(e.message)
      })
      .finally(() => setLoading(false))
  }

  const mValue = useMemo(() => ({user, logout, signUp, signIn, loading, authError, logoutError}), [user, loading, authError, logoutError]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //Log in
        setUser(user)
        setLoading(false)
      } else {
        setUser(null)
        setLoading(true)
        router.push('/login')
      }

      setInitialLoading(false)
    })
  }, [auth])

  return (
    <AuthContext.Provider value={mValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;