import { Router } from "express";
import {readFile} from 'fs/promises';


const fileProducts = await readFile('./data/productos.json','utf-8')
const productsData = JSON.parse(fileProducts)

const router = Router()


router.get('/getProducts/', (req,res)=>{
    try {
       const result = productsData.map(e =>e)
 
       if(result){

         res.status(200).json(result)
       }
       else{
          res.status(400).json('No hay productos en venta')
       }
  
       
    } catch (error) {
       res.status(500).json('Error en el servidor: ' + error.message);
    }
 
 })



router.post('/getProductsByCategory/', (req,res)=>{
   try {
      const categoria = req.body.id

      const result = productsData.filter(e => e.categoria_id == categoria);

      if(result){

        res.status(200).json(result)
      }
      else{
         res.status(400).json('No hay productos en venta')
      }
 
      
   } catch (error) {
      res.status(500).json('Error en el servidor: ' + error.message);
   }

})



 export default router;