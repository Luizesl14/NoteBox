import { canSSRAuth } from '../../util/canSSRAuth';

import { Header } from '../../components/Header'

export default function Dashboard() {
    return(
       <>
        <Header/>
        <div>
            <h1>Bem vindo ao Dashboard</h1>
        </div>
       </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props:{}
    }
})