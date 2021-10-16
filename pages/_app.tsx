import 'tailwindcss/tailwind.css';
import NavBar from 'components/NavBar/NavBar';

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  return (
    <div>
      <NavBar />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
