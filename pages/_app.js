import '../styles/globals.css'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    dynamicallyImportPackage();
  }, []);

  let dynamicallyImportPackage = async () => {
    await import("../node_modules/tw-elements/dist/js/index.min.js");
  };

  return <Component {...pageProps} />
}

export default MyApp
