import Head from 'next/head';
import styles from './style.module.scss';
import { Header } from '../../components/Header'
import { canSSRAuth } from '../../util/canSSRAuth';
import { Input } from '../../components/layout/Input';
import { Select } from '../../components/layout/Select';
import { FiUpload } from 'react-icons/fi';
import { ChangeEvent, useState } from 'react';


export default function Produtc(){

    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvt, setImgAvt] = useState(null);

    function handleFile(event: ChangeEvent<HTMLInputElement>){

        if(!event.target.files){
            return;
        }

        const image = event.target.files[0];

        if(!image){
            return;
        }

        if(image.type === 'image/jpeg' || image.type === 'image/png'){
            setImgAvt(image);
            setAvatarUrl(URL.createObjectURL(event.target.files[0]))
        }
    }

    return(
        <>
        <Head>
            <title>Novo Produto</title>
        </Head>
        
        <div>
         <Header/>
           <main className={styles.container}>
            <h1>Pagina novo produto</h1>
            <form className={styles.form}>

                <label className={styles.labelAvatar}>
                    <span>
                        <FiUpload size={25} color="#FFF"/>
                    </span>

                    <Input  type='file' accept='image/png, image/jpeg' onChange={handleFile}/>

                {avatarUrl && (
                     <img 
                        className={styles.preview}
                        src={avatarUrl} 
                        alt='Foto produto' 
                        width={250} 
                        height={250}/>
                )}

                </label>


                <Select
                    // value={formData.persona.gender}
                    // onChange={(e) =>setFormData({ ...formData, persona: { ...formData.persona, gender: e.target.value } })}
                >
                    <option value="">Select Product...</option>
                    <option value="F">Pizza</option>
                    <option value="M">Carne</option>
                    <option value="O">Refri</option>
                </Select>

                <Input type='text' placeholder='Preco do Produto' />

                <textarea 
                    placeholder="Descreva seu produto..."
                    className={styles.input}
                />

                <button className={styles.btnAdd} type='submit'>
                    Cadastrar
                </button>
                
              

            </form>
           </main>
        </div>
        </>
    );
}


export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props:{}
    }
})