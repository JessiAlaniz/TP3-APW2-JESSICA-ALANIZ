import { API } from "./api.js"

export const AllProducts = async() =>{

    try {
        const res = await fetch(`${API}/products/getProducts/`,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
        return {status:false}
    }
}

export const ProductsByCategory = async(id) =>{

    try {
        const res = await fetch(`${API}/products/getProductsByCategory/`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id }) // Enviar cuerpo de la solicitud en formato JSON
        })
        
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
        return {status:false}
    }
}