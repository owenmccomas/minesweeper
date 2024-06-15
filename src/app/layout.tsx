import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";

export const metadata = {
  title: "Minesweeper",
  description: "Built by Owen McComas",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="flex min-h-screen flex-col">
        <main className="container mx-auto my-auto py-8">
          {children}
        </main>
        <footer className="bg-white py-4 shadow-md">
          <div className="container mx-auto flex items-center justify-between">
            {/* <span>Stopwatch</span>
            <span>Flags: 0</span> */}
          </div>
        </footer>
      </body>
    </html>
  );
}