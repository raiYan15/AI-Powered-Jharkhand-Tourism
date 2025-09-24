// Custom React hook for authentication (JWT, role, login/logout)
import { useState, useEffect } from 'react';

export function useAuth() {
  // Mock user for dashboard demo
  return {
    user: { id: 1, name: 'Admin', role: 'admin', token: 'demo-token' },
    token: 'demo-token',
    login: async () => {},
    logout: () => {},
    isAuthenticated: true,
    role: 'admin',
  };
}
