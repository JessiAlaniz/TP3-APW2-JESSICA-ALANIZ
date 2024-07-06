import { Router } from "express";
import {readFile , writeFile} from 'fs/promises';


const fileSells = await readFile('./data/ventas.json','utf-8')
const sellData = JSON.parse(fileSells)



const router = Router()


router.post('/newSell/', async (req,res) =>{

   try {
      const lastSellId = sellData.length > 0 ? sellData[sellData.length -1].id + 1 : 1
   

      const id_usuario = req.body.id_usuario
      const fecha = req.body.fecha
      const total = req.body.total
      const dirección = req.body.dirección
      const productos = req.body.productos
  
  
      const Data = {
        "id": lastSellId,
        "id_usuario": id_usuario,
        "fecha": fecha,
        "total": total,
        "dirección": dirección,
        "productos": productos
      }
  
      sellData.push(Data)
  
      await writeFile('./data/ventas.json', JSON.stringify(sellData, null, 2), 'utf-8');
  
      res.status(200).json('todo salio ok')
      
   } catch (error) {
      res.status(400).json(error);
   }

    

})


router.post('/sells/', (req,res)=>{
   try {

      const id_venta= req.body.id

      const result = sellData.find(e => e.id == id_venta)


      if(result){

        const respuesta = {
            numero_venta: result.id,
            fecha_venta: result.fecha,
            total: result.total
        };

        res.status(200).json(respuesta)
      }
      else{
         res.status(400).json('Venta no encontrada')
      }
 
      
   } catch (error) {
      res.status(500).json('Error en el servidor: ' + error.message);
   }

})


router.delete('/deletesell/:id', async (req,res)=>{
   try {

      const id_venta = parseInt(req.params.id)


        const index = sellData.findIndex(e => e.id === id_venta);

        if (index !== -1) {
       
            sellData.splice(index, 1);

            
            await writeFile('./data/ventas.json', JSON.stringify(sellData, null, 2), 'utf-8');

            res.status(200).json({ message: "Venta eliminada con éxito" });
        } else {
            res.status(400).json('Venta no encontrada');
        }
 
      
   } catch (error) {
      res.status(500).json('Error en el servidor: ' + error.message);
   }

})


router.get('/sells/:id', (req,res)=>{
   try {

      const id_venta = parseInt(req.params.id);

      const result = sellData.find(e => e.id == id_venta)


      if(result){
         res.status(200).json(result)
      }
      else{
         res.status(400).json('Venta no encontrada')
      }
 
      
   } catch (error) {
      res.status(500).json('Error en el servidor: ' + error.message);
   }

})

export default router;