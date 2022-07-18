import Document, { Html, Head, Main, NextScript } from "next/document";
import { createRelayDocument, RelayDocument } from "relay-nextjs/document";

interface DocumentProps {
  relayDocument: RelayDocument;
}

class MyDocument extends Document<DocumentProps> {
  static async getInitialProps(ctx) {
    const relayDocument = createRelayDocument();

    const renderPage = ctx.renderPage;
    ctx.renderPage = () =>
      renderPage({
        enhanceApp: (App) => relayDocument.enhance(App),
      });

    const initialProps = await Document.getInitialProps(ctx);

    console.log("Document Initial props", ctx);

    return {
      ...initialProps,
      relayDocument,
    };
  }

  render() {
    const { relayDocument } = this.props;

    return (
      <Html>
        <Head>
          <relayDocument.Script />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
