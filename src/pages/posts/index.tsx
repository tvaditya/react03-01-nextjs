import styles from './styles.module.scss';
import Head from 'next/head';

export default function Posts() {
    return(
      <>
          <Head>
              <title>Posts | Ignews</title>
          </Head>

          <main className={styles.container}>
              <div className={styles.posts}>
                  <a href={"#"}>
                      <time> 29 de junho de 2021</time>
                      <strong> Criando um monorepo com Lerna & Yarn workspaces</strong>
                      <p>Nesse guia você aprenderá como criar um monorepo para gerenciar múltiplos pacotes</p>
                  </a>
                  <a href={"#"}>
                      <time> 29 de junho de 2021</time>
                      <strong> Criando um monorepo com Lerna & Yarn workspaces</strong>
                      <p>Nesse guia você aprenderá como criar um monorepo para gerenciar múltiplos pacotes</p>
                  </a>
                  <a href={"#"}>
                      <time> 29 de junho de 2021</time>
                      <strong> Criando um monorepo com Lerna & Yarn workspaces</strong>
                      <p>Nesse guia você aprenderá como criar um monorepo para gerenciar múltiplos pacotes</p>
                  </a>
              </div>
          </main>
      </>
    );
}