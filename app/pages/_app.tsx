import type { AppProps } from 'next/app'
import '../styles/globals.css'
import 'react-datepicker/dist/react-datepicker.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
