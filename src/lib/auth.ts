import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs'; // Remove unused import
import { AdminUser } from '@/types/reviews';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';
const ADMIN_ID = process.env.ADMIN_ID || 'rupeebee_admin_2025';
const ADMIN_PSK = process.env.ADMIN_PSK || 'RupeeBee@Admin#2025Secure';

export function validateAdminCredentials(id: string, psk: string): boolean {
  return id === ADMIN_ID && psk === ADMIN_PSK;
}

export function generateAdminToken(adminId: string): string {
  const payload = {
    id: adminId,
    role: 'admin',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (8 * 60 * 60) // 8 hours
  };

  return jwt.sign(payload, JWT_SECRET);
}

export function verifyAdminToken(token: string): AdminUser | null {
  // Only run on server side
  if (typeof window !== 'undefined') {
    console.error('verifyAdminToken should not be called on client side');
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload & { id: string; role: string; exp: number };
    
    if (decoded.role !== 'admin') {
      return null;
    }

    return {
      id: decoded.id,
      token,
      expires_at: decoded.exp * 1000
    };
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  try {
    // Simple base64 decode of JWT payload (client-safe)
    const parts = token.split('.');
    if (parts.length !== 3) return true;
    
    const payload = JSON.parse(atob(parts[1]));
    if (!payload.exp) return true;
    
    return Date.now() >= payload.exp * 1000;
  } catch {
    return true;
  }
}

export function getTokenExpirationTime(token: string): number | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const payload = JSON.parse(atob(parts[1]));
    return payload.exp ? payload.exp * 1000 : null;
  } catch {
    return null;
  }
}

// Client-side safe function to get admin ID from token
export function getAdminIdFromToken(token: string): string | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const payload = JSON.parse(atob(parts[1]));
    return payload.id || null;
  } catch {
    return null;
  }
}
