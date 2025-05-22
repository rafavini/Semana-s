'use client'

import { useEffect, useState } from "react"
import Image from "next/image";

interface Products {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function Home() {
  const [products, setProducts] = useState<Products[]>([])
  const [cart, setCart] = useState<Products[]>([])
  const [showCart, setShowCart] = useState(false)

  // Carrega os produtos
  useEffect(() => {
    async function GetProductDatas() {
      const response = await fetch("https://fakestoreapi.com/products")
      const data = await response.json()
      setProducts(data)
    }
    GetProductDatas()
  }, [])

  // Carrega o carrinho salvo no localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Atualiza localStorage quando o carrinho muda
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // Adiciona produto ao carrinho
  const handleAddToCart = (product: Products) => {
    setCart(prev => [...prev, product])
  }

  // Remove um produto do carrinho
  const handleRemoveFromCart = (productId: number) => {
    const updatedCart = cart.filter(item => item.id !== productId)
    setCart(updatedCart)
  }

  return (
    <div className="p-4">
      {/* Botão Ver Carrinho com contador */}
      <button
        className="mb-4 p-2 bg-green-600 text-white rounded relative"
        onClick={() => setShowCart(prev => !prev)}
      >
        {showCart ? 'Fechar Carrinho' : `Ver Carrinho (${cart.length})`}
      </button>

      {/* Carrinho */}
      {showCart ? (
        <div>
          <h2 className="text-xl font-bold mb-2">Carrinho:</h2>
          {cart.length === 0 ? (
            <p>Nenhum produto no carrinho.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="mb-4 border p-2 rounded flex items-center gap-4">
                <Image src={item.image} width={80} height={80} alt="image" />
                <div className="flex-1">
                  <h2 className="font-semibold">{item.title}</h2>
                  <h3 className="text-gray-700">R${item.price.toFixed(2)}</h3>
                </div>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Remover
                </button>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {products.map((item) => (
            <div key={item.id} className="border p-4 rounded shadow">
              <Image src={item.image} width={100} height={100} alt="image" />
              <h2 className="font-semibold">{item.title}</h2>
              <h3 className="text-gray-700">R${item.price.toFixed(2)}</h3>
              <button
                className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
                onClick={() => handleAddToCart(item)}
              >
                Comprar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
