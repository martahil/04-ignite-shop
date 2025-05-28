import { ImageContainer, ProductContainer, ProductDetails } from '../../styles/pages/product'
import { useRouter } from 'next/router'

export default function Product() {
  const { query } = useRouter()

  return (
    <ProductContainer>
      <ImageContainer>
        
      </ImageContainer>

      <ProductDetails>
        <h1>T-shirt X</h1>
        <span>$79.90</span>   

        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi omnis sit atque ipsum dolores, eligendi nostrum. Doloribus repudiandae quod numquam quas voluptatibus quasi in, magnam quis aperiam quibusdam quisquam dignissimos.</p>     

        <button>
          Buy now
        </button>
      </ProductDetails>
    </ProductContainer>
  )
}