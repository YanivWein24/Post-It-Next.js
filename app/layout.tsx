import "./globals.css";
import Nav from "./Nav";
import { Roboto } from "@next/font/google";
import QueryWrapper from "./QueryWrapper";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

export const metadata = {
  title: "Post It",
  description: "A web app to share posts using next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`mx-4 md:mx-48 xl:mx-96 ${roboto.variable} bg-gray-200 animate-fade-in`}
      >
        <QueryWrapper>
          {/* @ts-expect-error next 13 error */}
          <Nav />
          {children}
        </QueryWrapper>
      </body>
    </html>
  );
}
