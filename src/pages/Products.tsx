import { useEffect, useState } from "react"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const Products = () => {

  type TProduct = {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: TVariants[];
  inventory: TInventory;
}

type TVariants = {
  type: string;
  value: string
}

type TInventory = {
  quantity: number;
  inStock: boolean;
}

  const url = 'http://localhost:3000/api/products/all'
  const [product, setProduct] = useState<TProduct[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(url)
        if(!response.ok) {
          throw new Error("Erro ao buscar produtos")
        }
        const data = await response.json()
        setProduct(data.data)
      } catch (err) {
        console.error("Erro ao renderizar aq", err)
      }
    }
    fetchProducts()
  }, [])

  return (
    <div>
      {product.map((prod: any) => (
        <Card key={prod._id} className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Produto</CardTitle>
            <CardDescription>Categoria {prod.category}</CardDescription>
            <CardAction>Valor R${prod.price}</CardAction>
          </CardHeader>
          <CardContent>
            <p>Nome: {prod.name}</p>
          </CardContent>
          <CardContent>
            <p>Descrição: {prod.description}</p>
          </CardContent>
          <CardContent>
            <p>Estoque: {prod.inventory.quantity}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default Products