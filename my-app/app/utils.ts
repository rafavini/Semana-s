export async function GetProductDatas(){
    const response = await fetch("https://fakestoreapi.com/products")
    const data = await response.json()

    return data;
}