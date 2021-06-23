import Head from 'next/head';
import styles from './home.module.scss';
import {SubscribeButton} from "../components/SubscribeButton";
import {GetServerSideProps, GetStaticProps } from 'next';
import { stripe } from '../services/stripe';

interface HomeProps {
    product: {
        priceId: string;
        amount: number;
    }
}

export default function Home({ product }: HomeProps) {

  return (
      <>
        <Head>
          <title>Home | ig.news</title>
        </Head>
        <main className={styles.contentContainer}>
            <section className={styles.hero}>
                <span>👏 Hey, welcome</span>
                <h1>News about the <span>React</span> world.</h1>
                <p>
                    Get access to all the publications <br />
                    <span>for {product.amount} month</span>
                </p>
                <SubscribeButton priceId={product.priceId}/>
            </section>

            <img src={"/images/avatar.svg"} alt="Girl coding" />
        </main>
    </>
  )
}

//export const getServerSideProps: GetServerSideProps = async() => {
export const getStaticProps: GetStaticProps = async() => {
    const price = await stripe.prices.retrieve('price_1J5al0DGE7Sp6H3eg3uoMmu2', {
        expand: ['product']
    })

    const product = {
        priceID: price.id,
        amount: new Intl.NumberFormat('en-us', {
            style: 'currency',
            currency: 'USD'
        }).format(price.unit_amount / 100),
    }

    console.log("Rendered in Server Side")
    return {
        props: {
            product,
        },
        revalidate: 60 * 60 * 24, //24h
    }
}