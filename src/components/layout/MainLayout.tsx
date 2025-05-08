import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import BottomNavbar from './BottomNavbar';
import ChatButton from '../ui/ChatButton';
import PageTransition from './PageTransition';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow pt-2 pb-16">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <BottomNavbar />
      <ChatButton />
      <Footer />
    </div>
  );
};

export default MainLayout;