import Document, {
    DocumentContext,
    DocumentInitialProps,
    Html,
    Head,
    Main,
    NextScript,
} from 'next/document';
import { Favicon } from '@/components/index';

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
        const initialProps = await Document.getInitialProps(ctx);

        return initialProps;
    }

    render() {
        return (
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    {/* <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> */}
                    <link
                        href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;700&display=swap"
                        rel="stylesheet"
                    />
                    <Favicon />
                </Head>
                <body className="font-Quicksand">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
