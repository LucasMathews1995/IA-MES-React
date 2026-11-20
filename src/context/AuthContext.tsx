import Keycloak from 'keycloak-js';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// 1. Definição da interface do Utilizador (User)
export interface User {
  username: string;
  roles: string[];
}


const keycloak = new Keycloak({
  url: 'http://localhost:8180',
  realm: 'mes-realm',
  clientId: 'mes-app'
});

export interface AuthContextProps {
  user: User | null;
  token: string | null;
  login: () => void;
  logout: () => void;
  isAuthenticated: boolean;
}


const AuthContext = createContext<AuthContextProps | undefined>(undefined);


interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('access_token'));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  useEffect(() => {

    keycloak.init({ onLoad: 'login-required' ,checkLoginIframe: false}).then((authenticated) => {

      setIsAuthenticated(authenticated);

      if (authenticated) {
        setToken(keycloak.token ?? null);

        setUser({
          username: keycloak.tokenParsed?.preferred_username || 'Usuário',
          roles: keycloak.tokenParsed?.realm_access?.roles || [],
        });

        if (keycloak.token) {
          localStorage.setItem('access_token', keycloak.token);
        }
      }}).catch((err) => {
        console.error('Falha ao inicializar o Keycloak', err);
      });
  }, []);
    


    const login = () => {
    keycloak.login();
  };
  
  const logout = () => {
    keycloak.logout({ redirectUri: window.location.origin });
    localStorage.removeItem('access_token');
  };


  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
 
 export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
  }
  return context;
};