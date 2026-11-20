import React from 'react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div
      role="status"
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#1E293B',
        color: '#FFFFFF',
        padding: '10px 18px',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: 500,
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.16)',
        zIndex: 50,
      }}
    >
      {message}
    </div>
  );
};