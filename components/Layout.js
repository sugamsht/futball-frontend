import Navbar from "./Menu";
import Footer from "./Footer";
import Head from "next/head";

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <title>Nepal Foosball</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    )
}