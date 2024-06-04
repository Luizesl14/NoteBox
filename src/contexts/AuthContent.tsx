import { createContext, ReactNode, useEffect, useState } from 'react';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import Router from 'next/router';
import { api } from '../services/apiClient';
import { toast } from 'react-toastify';

type AuthContextData = {
    user: UserProps | null;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    business_id: string;
    email: string;
    password: string;
}

type SignUpProps = {
    persona: {
        name: string;
        gender: string;
        rg: string;
        cpf: string;
    },
    company: {
        name: string;
        cnpj: string;
        website: string;
        type: string;
        state_registration: string;
        municipal_registration: string;
        activity_sector: string;
    },
    data: {
        phone: string;
        cep: string;
        address_number: string;
        complement: string;
    },
    user: {
        email: string;
        password: string;
        role: string;
    }
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
    try {
        destroyCookie(undefined, '@nextauth.token');
        Router.push('/');
    } catch (err) {
        toast.error('Erro ao deslogar');
        console.error("Erro ao deslogar", err);
    }
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps | null>(null);
    const isAuthenticated = !!user;

    useEffect(() => {
        const { '@nextauth.token': token } = parseCookies();

        if (token) {
            api.get('/me/detail').then(res => {
                const { id, name, email } = res.data;
                setUser({ id, name, email });
            }).catch(err => {
                console.error("Erro ao buscar detalhes do usuário", err);
                signOut(); // Se houver erro ao buscar detalhes do usuário, faça o signOut
            });
        }
    }, []);

    async function signIn({ business_id, email, password }: SignInProps) {
        try {
            const response = await api.post('/session/auth', { business_id, email, password });
            const { id, name, token } = response.data;

            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30, // 1 mês
                path: "/"
            });

            setUser({ id, name, email });
            api.defaults.headers['Authorization'] = `Bearer ${token}`;
            toast.success('Logado com sucesso');
            Router.push('/dashboard');
        } catch (err) {
            toast.error('Erro ao logar');
            console.log("Erro ao logar...", err);
        }
    }

    async function signUp({ persona, company, data, user }: SignUpProps) {
        try {
            const schema = 'sch_' + company.name;
            const status = 'PAID';
            const paid_market_id = '00001x';
            const env = 'dev';
            const user_adm_req = '@Luizesl14';
            const pass_adm_req = 'a1d14e236126';

            const response = await api.post('/customer/create', {
                schema,
                status,
                paid_market_id,
                env,
                user_adm_req,
                pass_adm_req,
                persona,
                company,
                data,
                user
            });

            console.log(response.data);
            toast.success('Cadastro realizado com sucesso!');
            Router.push('/dashboard');
        } catch (err) {
            toast.error('Erro ao cadastrar');
            console.log("Erro ao cadastrar...", err);
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    );
}
