import styles from './styles.module.scss';
import Head from 'next/head';
import {GetStaticProps} from "next";
import {getPrismicClient} from "../../services/prismic";
import Prismic from '@prismicio/client';

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

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient()

    const response = await prismic.query([
        Prismic.predicates.at('document.type', 'post')
        ], {
            fetch: ['post.title', 'post.content'],
            pageSize: 100,
        }
    )

    // console.log(JSON.stringify(response, null, 2))
    // console.log(response)

    return {
        props: {}
    }
}