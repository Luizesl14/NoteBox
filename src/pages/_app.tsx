import '../../styles/globals.scss';
import { AppProps } from 'next/app'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from '../contexts/AuthContent';


export function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
        <Component {...pageProps} />
        <ToastContainer autoClose={3000}/>
    </AuthProvider>
  );
}

export default App;


