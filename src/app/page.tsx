import { Button } from '@/components/ui/button';
import React from 'react';
import Grid from './_components/Grid';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header className="bg-white shadow-md py-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">Minesweeper</h1>
            <Button className="btn" variant={'ghost'} >Restart</Button>
          </div>
        </header>
        <main className="container mx-auto my-auto py-8">{children}
        <div className="flex items-center justify-center mx-auto my-auto">
          <Grid />
        </div>
        </main>
        <footer className="bg-white shadow-md py-4">
          <div className="container mx-auto flex justify-between items-center">
            <span>Stopwatch</span>
            <span>Flags: 0</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
