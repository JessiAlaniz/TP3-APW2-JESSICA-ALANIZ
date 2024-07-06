import { Router } from "express";
import {readFile} from "fs/promises"


const fileCategories = await readFile('./data/categorias.json','utf-8')

const categoriesData = JSON.parse(fileCategories)

const router = Router()

router.get('/all/', (req,res) =>{
try {

    const result = categoriesData.map(e => e)

    res.status(200).json(result)
} catch (error) {
    res.status(500).json('Error en el servidor: ' + error.message);
}

}
)

export default router;