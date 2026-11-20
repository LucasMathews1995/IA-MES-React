import React from 'react';
import { useAuth } from '../context/AuthContext';

export function LoginScreen() {
  
  const { login, isAuthenticated } = useAuth();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
      <h1>Bem-vindo ao Meu App com Keycloak</h1>
      
      {isAuthenticated ? (
        <p>Você já está logado! Redirecionando...</p>
      ) : (
        <div>
          <p>Para acessar o sistema, você precisa se autenticar na segurança corporativa.</p>
          
          {/* Quando o usuário clica, dispara o redirecionamento para o Keycloak */}
          <button 
            onClick={login}
            style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}
          >
            Fazer Login com Keycloak
          </button>
        </div>
      )}
    </div>
  );
}