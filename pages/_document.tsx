import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="text-lg lg:text-xl leading-snug font-serif bg-linear-to-br from-cyan-400 to-pink-200 min-h-screen">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
