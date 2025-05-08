import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import MainLayout from '@/components/layout/MainLayout';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EStore - Your Online Shop',
  description: 'Find the best products at great prices',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <MainLayout>
              {children}
            </MainLayout>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}