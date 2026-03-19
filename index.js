
import express from 'express'
import jobs from './jobs.json' with {type:'json'}

const PORT = process.env.PORT ?? 3000

const app = express()



app.use((req,res,next)=>{
    const timeString = new Date().toLocaleTimeString()
    console.log(`[${timeString}] ${req.method}${req.url}`)
    next()
})
const previousHomeMiddleware = (req, res,next)=>{
    console.log('Middleware previo a')
    next()
}
app.get('/',previousHomeMiddleware,(request,response)=>{
    return response.send('<h1>hello Word</h1>')

})

app.get('/healthy',(req,res)=>{
    return res.json({
        status:'ok',
        uptime: process.uptime()
    })
}
)

app.get('/get-jobs',(req,res)=>{

    const {text , title , level, technology, offset} = req.query
    let filteredJobs = jobs
    if(text){
        const searchTerm = text.toLowerCase()
        filteredJobs = filteredJobs.filter(job =>
            job.titulo.toLowerCase().includes(searchTerm) || job.descripcion.toLowerCase().includes(searchTerm)
        )
    }

    return res.json(filteredJobs)
})

app.get('/get-single-job/:id',(req,res)=>{
    const {id} = req.params //parametro dinamico(son cadenas de texto)se debe transformar
    const idNumber = Number(id) //aqui se combierte a number
    return res.json({
        job:{idNumber,title:`job with id ${id}`}
    })
})
//ruta opcionales
app.get('/a{b}cd',(req,res)=>{
    return res.send('abcd o acd')
})
//comdin
app.get('/aa*aa',(req,res)=>{
    return res.send('aaa(comodin)aaa')
})
app.listen(PORT,()=>{
    console.log(`serivdor http://localhost:${PORT}`)
})