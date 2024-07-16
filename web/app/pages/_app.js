import '../styles/globals.css';
import { AuthProvider } from '../contexts/AuthContext';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
    const { showHeader = true, showFooter = true, showSidebar = true } = Component;

    return (
        <AuthProvider>
            <Layout showHeader={showHeader} showFooter={showFooter} showSidebar={showSidebar}>
                <Component {...pageProps} />
            </Layout>
        </AuthProvider>
    );
}

export default MyApp;
