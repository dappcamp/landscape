import Document, { Html, Head, Main, NextScript } from 'next/document'
import { CssBaseline } from '@nextui-org/react'

const title = 'Ethereum Developer Tooling Landscape | DappCamp'
const defaultDescription = 'Ethereum Developer Tooling Landscape'

//@ts-ignore
class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      styles: <>{initialProps.styles}</>,
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {CssBaseline.flush()}
          <title>DappCamp</title>

          <meta name="title" content={title} />
          <meta name="description" content={defaultDescription} />

          <meta property="og:type" content="website" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={defaultDescription} />
          <meta
            property="og:image"
            content="https://www.dappcamp.xyz/og-image.png"
          />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={defaultDescription} />

          <meta
            name="twitter:image"
            content="https://www.dappcamp.xyz/og-image.png"
          />

          <link rel="icon" href="https://dappcamp.xyz/favicon.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
