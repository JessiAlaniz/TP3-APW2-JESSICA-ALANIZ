import { Router } from "express";
import {readFile, writeFile} from 'fs/promises';


const fileUsers = await readFile('./data/usuarios.json','utf-8')
const userData = JSON.parse(fileUsers)
const router = Router()


router.post('/users/validation', (req, res) => {
   try {
       const { email, pass } = req.body;

       const result = userData.find(e => e.email === email && e.password === pass);

       if (result) {
           res.status(200).json({ message: 'Usuario validado con éxito', id: result.id , email: result.email});
       } else {
           res.status(400).json('Usuario no encontrado');
       }
   } catch (error) {
       res.status(500).json('Error en el servidor: ' + error.message);
   }
});


router.post('/newuser/', async (req,res)=>{
    try {
 
       const lastUserId = userData[userData.length - 1].id;
 
       const { user, password, username, email } = req.body;
 
    
         if (!user || !password || !username || !email) {
             return res.status(400).json({ error: 'Todos los campos son obligatorios: user, password, username y email' });
         }
 
 
        const new_user =   {
          "id": lastUserId+1,
          "user": user,
          "password": password,
          "username": username,
          "email": email
        }
 
        userData.push(new_user);
        await writeFile('./data/usuarios.json', JSON.stringify(userData, null, 2), 'utf-8');
        res.status(200).json("Usuario registrado con exito")
       
    } catch (error) {
       res.status(500).json('Error en el servidor: ' + error.message);
    }
 
 })
 
 

 router.put('/email/', async (req,res)=>{
    try {
 
       const id_usuario = req.body.id
       const email_nuevo = req.body.email
 
       const result = userData.find(e => e.id == id_usuario)
 
 
       if(result){
          result.email = email_nuevo;
          await writeFile('./data/usuarios.json', JSON.stringify(userData, null, 2), 'utf-8');
          res.status(200).json(`El email del Sr.${result.nombre + " " + result.apellido} fue modificado correctamente`)
       }
       else{
          res.status(400).json('Usuario no encontrado')
       }
  
       
    } catch (error) {
       res.status(500).json('Error en el servidor: ' + error.message);
    }
 
 })
 
 export default router;