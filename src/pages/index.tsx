import Head from "next/head";
import Image from "next/image";
import styles from '../../styles/home.module.scss'

import logoImg from '../../public/logo.svg';

import { Input } from '../components/layout/Input'
import { Button } from '../components/layout/Button'

import { AuthContext } from "../contexts/AuthContent";
import Link from "next/link";
import { FormEvent, useContext, useState } from "react";
import { GetServerSideProps } from "next";
import { canSSRGuest } from '../util/canSSRGuest';

export default function Home() {

  const  { signIn } = useContext(AuthContext)

  const [business_id, setBusiness_id] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent){

    if(email === '' || password === ''){
      alert("Preencha os dados!")
      return;
    }
     setLoading(true);
     event.preventDefault();
     await signIn({business_id, email, password})
     setLoading(false);
  }

  return (
      <>
      <Head>
        <title>Faca seu Login</title>
      </Head>
      <div className={styles.containerCenter}>
      <Image src={logoImg} alt="NoteBox" priority />

         <div className={styles.login}>
          <form onSubmit={handleLogin}>

           <Input 
            type="text" 
            placeholder="Enter your Company ID" 
            value={ business_id }
            onChange={ (e) => setBusiness_id(e.target.value)}
            />

           <Input 
            type="text" 
            placeholder="Enter your e-mail" 
            value={ email }
            onChange={ (e) => setEmail(e.target.value)}
           />

           <Input 
            type="password" 
            placeholder="Enter your password" 
            value={ password }
            onChange={ (e) => setPassword(e.target.value)}
           />

           <Button 
           type= "submit"  
           loading={loading}>Login
           </Button>

          </form>
          <Link href="/signup">
            <span className={styles.text}>Don't have an account? Register</span>
          </Link>
         
              
         </div>
      </div>
      </>
  );
}

export const getServerSideProps = canSSRGuest(async(ctx) => {
  return{
    props: {}
  }
})
