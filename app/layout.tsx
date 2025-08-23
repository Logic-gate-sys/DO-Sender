import type { Metadata } from "next";
import "./globals.css";
import  {Providers}  from '@/providers';






//SEO - metadata 
export const metadata: Metadata = {
  title: "DO-Sender",
  description: "A simple ERC20 Token Airdrop nextjs static app"
};

//typed props
type rootProps = {
  children:React.ReactNode
}
const  RootLayout = ({children}: rootProps)=>{
  return (
    <html lang="en">
      <body >
        <Providers>
            {children}
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;

