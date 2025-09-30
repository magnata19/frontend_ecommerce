import { useEffect, useState } from "react"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import Modal from "./Modal";

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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

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

  const handleClick = () => {
    setIsModalOpen(true)
  }

  return (
    <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
          <CardContent className="flex items-center justify-between">
            <p>Estoque: {prod.inventory.quantity}</p>
            <Button onClick={handleClick}>Detalhes</Button>
          </CardContent>

        </Card>
      ))}
      <Modal open={isModalOpen} onOpenChange={setIsModalOpen}/>
    </div>
  )
}

export default Products