import { FormEvent, useState } from "react";
import Head from "next/head";
import { Header } from "../../components/Header";
import styles from './styles.module.scss';

import { Input } from '../../components/layout/Input';
import { setupAPIClient } from "../../services/api";
import { canSSRAuth } from "../../util/canSSRAuth";
import { toast } from 'react-toastify';


export default function Category(){

    const [name, setName] = useState('');

    async function handleRegister(event: FormEvent){
        event.preventDefault();

        if(name === ''){
            toast.error("Digite nome da Categoria!")
        }

        try {

            const apiClient = setupAPIClient();
            await apiClient.post('/category/create', { name });

            toast.success("Categoria cadastrada com sucesso!");
            setName('');
        } catch (err) {
            toast.error("Erro ao cadastrar categoria: " + err.message);
        }

        

    }

    return(
        <>
         <Head>
            <title>Nova Categoria</title>
         </Head>
         <div>
            <Header />
            <main className={styles.container}>
                <h1>Cadastrar Categoria</h1>

                <form className={styles.form} onSubmit={handleRegister}>
                    <Input  
                     type="text"
                     placeholder="Digite nome da Categoria"
                     value={name}
                     onChange={ (e) => setName(e.target.value)}
                    />

                    <button 
                      className={styles.btnAdd} 
                      type="submit">Cadastrar</button>
                </form>
            </main>
         </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {}
    }
})