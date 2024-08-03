
import { Inter } from "next/font/google";
import "./globals.css";
import ClientProviders from "./clientProvider";
import ThemeToggle from "../components/ThemeToggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Enquiry Management Task",
  description: "This is a enquiry managment system",
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className={`${inter.className} dark:bg-black dark:text-white`}>
        <ClientProviders>
          <div className="container mx-auto">
            <ThemeToggle />
            {children}
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}
