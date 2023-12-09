import '../styles/globals.css'
import '../components/LiveScore.scss'
import { useEffect } from 'react'
import Layout from '../components/Layout.js'

import { QueryClientProvider, QueryClient } from 'react-query'
// import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    let dynamicallyImportPackage = async () => {
      await import("../node_modules/tw-elements/dist/js/index.min.js");
    };
    dynamicallyImportPackage();
  }, []);

  return (
    <QueryClientProvider client={queryClient} >
      <Layout>
        <Component {...pageProps} />
      </Layout>
      {/* <ReactQueryDevtools initialIsOpen={false} position='bottom-right' /> */}
    </QueryClientProvider>
  )
}

export default MyApp
