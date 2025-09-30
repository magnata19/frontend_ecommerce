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
import Cookies from "universal-cookie"
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"

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

type TokenType = {
  email: string;
  role: string;
  iat: number;
  exp: number;
}

  const url = 'http://localhost:3000/api/products/all'
  const [product, setProduct] = useState<TProduct[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [decodedToken, setDecodedToken] = useState<TokenType>({email: '', role: '', iat: 0, exp: 0})
  const cookies = new Cookies();
  const navigate = useNavigate()
  const isTokenValid = cookies.get('access_token')

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

    if(!isTokenValid) {
      navigate('/login')
    }

    try {
      const decoded: TokenType = jwtDecode(isTokenValid);
      setDecodedToken(decoded)
    } catch (err) {
      console.error("Erro ao decodificar token", err)
      navigate('/login')
    }
    fetchProducts()
  }, [])

  const handleClick = () => {
    setIsModalOpen(true)
  }

  // const decodedToken: TokenType = jwtDecode(isTokenValid)


  return (
    <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {product.map((prod: any) => (
        <Card key={prod._id} className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>{prod.name}</CardTitle>
            <CardDescription>Categoria {prod.category}</CardDescription>
            <CardAction>Valor R${prod.price}</CardAction>
          </CardHeader>
          <CardContent>
            <p>Descrição: {prod.description}</p>
          </CardContent>
          <CardContent className="flex items-center justify-between">
            <p>Estoque: {prod.inventory.quantity}</p>
          </CardContent>
          <CardContent>
            <Button onClick={handleClick} className="hover:cursor-pointer">Detalhes</Button>
            {decodedToken.role === 'admin' && <Button onClick={handleClick} className="bg-red-500 hover:bg-red-700 hover:cursor-pointer">Deletar</Button>}
          </CardContent>
        </Card>
      ))}
      <Modal open={isModalOpen} onOpenChange={setIsModalOpen}/>
    </div>
  )
}

export default Products