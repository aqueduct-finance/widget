// comment this out when testing injected styles in static bundle:
import '../src/styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp