import type { Metadata } from 'next';
import { Montserrat, Inter, Chewy, Chela_One } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/components/AuthProvider';
import StoreProvider from '@/redux/StoreProvider';
import InitAllUser from '@/Init/InitAllUser';
import InitAllFoods from '@/Init/InitAllFoods';
import { Toaster } from 'react-hot-toast';

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-heading',
});

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
});

export const chewy = Chewy({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-logo',
});

export const metadata: Metadata = {
  title: 'FoodDrop | Order food online',
  description: 'FoodDrop - Order food online from best food delivery service',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${inter.variable} ${chewy.variable} antialiased selection:bg-orange-400 selection:text-neutral-700`}
      >
        <AuthProvider>
          <StoreProvider>
            <InitAllFoods />
            <InitAllUser />
            {children}
            <Toaster
              toastOptions={{
                duration: 2000,
                style: {
                  border: '1px solid #c4c4c4',
                  padding: '5px 8px',
                },
              }}
            />
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
