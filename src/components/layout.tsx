import Head from 'next/head';
import  '../styles/Footer.css'; // Adjust the import path

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>{children}
       {/* Google-style footer */}
       
      
      </body>
      <footer className='google-footer'>
            <p>Google &copy; {new Date().getFullYear()}</p>
        </footer>
      
    </html>
  );
}
