import { useContext } from 'react';
import styles from '../Header/styles.module.scss';
import Link from 'next/link';
import { FiLogOut } from 'react-icons/fi';
import { AuthContext } from '../../contexts/AuthContent'; // Certifique-se de que o caminho esteja correto

export function Header() {
    const { signOut } = useContext(AuthContext);

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <img src="/logo.svg" width={190} height={60} alt="Logo" />
                </Link>

                <nav className={styles.menuNav}>
                    <Link href="/category">
                        <span>Categoria</span>
                    </Link>

                    <Link href="/product">
                        <span>Cardápio</span>
                    </Link>

                    <button onClick={signOut}>
                        <FiLogOut color='#FFF' size={24} />
                    </button>
                </nav>
            </div>
        </header>
    );
}
