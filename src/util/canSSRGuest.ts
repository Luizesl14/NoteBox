import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";

//funcao para paginas que so pode ser acessadas por visitantes
export function canSSRGuest<P>(fn: GetServerSideProps<P>){

    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

    const cookies = parseCookies(ctx);
// se existir cookies nao acessa paginas login
    if(cookies['@nextauth.token']){
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false,
            }
        }
    }
       return  await fn(ctx);
    }

}