import { GetServerSideProps } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import Stripe from 'stripe'
import { stripe } from '../lib/stripe'
import { SuccessContainer, ImageContainer } from '../styles/pages/success'

interface SuccessProps {
  customerName: string,
  product: {
    name: string,
    imageUrl: string
  }
}

export default function Success({ customerName, product }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Order placed | Ignite Shop</title>

        <meta name='robots' content='noindex' />
      </Head>
      <SuccessContainer>
        <h1>Order placed!</h1>

        <ImageContainer>
          <Image src={product.imageUrl} width={120} height={110} alt='' />
        </ImageContainer>

        <p>
          Woohoo <strong>{customerName}</strong>! Your <strong>{product.name}</strong> is on its way to your doorstep!
        </p>

        <Link href='/'>
          Back to catalog
        </Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const customerName = session.customer_details?.name ?? 'Customer'

  const lineItems = session.line_items?.data

  if (!lineItems || lineItems.length === 0) {
    return { notFound: true }
  }

  const price = lineItems[0].price

  if (!price || !price.product || typeof price.product === 'string') {
    return { notFound: true }
  }

  const product = price.product as Stripe.Product

  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0]
      }
    }
  }
}