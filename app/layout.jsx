import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils"
import { Providers } from "@/components/Providers";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Modern ChatBot",
  description: "Modern ChatBot",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen antialiased")}>
        <Providers>
        <main className="h-screen dark text-foreground bg-background">
          {children}
        </main>
        </Providers>
      </body>
    </html>
  );
}
