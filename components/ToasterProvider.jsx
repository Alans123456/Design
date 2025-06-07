'use client';

import { Toaster } from 'sonner';
import { useTheme } from 'next-themes';

export default function ToasterProvider() {
  const { theme } = useTheme() || { theme: 'dark' };
  
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      theme={theme === 'dark' ? 'dark' : 'light'}
    />
  );
}