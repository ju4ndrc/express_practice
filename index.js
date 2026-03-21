
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

    const {text , title , level, limit = 10, technology, offset = 0} = req.query
    let filteredJobs = jobs
    if(text){
        const searchTerm = text.toLowerCase()
        filteredJobs = filteredJobs.filter(job =>
            job.titulo.toLowerCase().includes(searchTerm) || job.descripcion.toLowerCase().includes(searchTerm)
        )
    }

    const limitNumber = Number(limit)
    const offsetNumber = Number(offset)

    const paginatedJobs = filteredJobs.slice(offsetNumber, offsetNumber + limitNumber)
   
    return res.json(paginatedJobs)
})

app.get('/get-single-job/:id',(req,res)=>{
    const {id} = req.params //parametro dinamico(son cadenas de texto)se debe transformar
    
    const job = jobs.find(job => job.id === id)
    if(!job){
        return    res.status(404).json({error:'Job not found'})
    }
    return res.json(job)
})

app.post('/create-job',(req,res)=>{
    const {titulo, empresa,ubicacion , data} = req.body

    const newJob= {
        id: crypto.randomUUID(),
        titulo,
        empresa,
        ubicacion ,
        data

    }
    jobs.push(newJob)//en una db se hace con un insert

    return res.status(201).json(newJob)
})

app.get('/update-job/:id',(req,res)=>{
    const {id} = req.params //parametro dinamico(son cadenas de texto)se debe transformar
    
    const job = jobs.find(job => job.id === id)
    if(!job){
        return    res.status(404).json({error:'Job not found'})
    }
    jobs[job]={
        ...jobs[job],title
    }
    return res.status(201).json(job)
})

app.delete('/delete-job/:id',(req,res)=>{
    const {id} = req.params

    jobs = jobs.filter(job => job.id === id)

    return res.status(204).json()
})

app.listen(PORT,()=>{
    console.log(`serivdor http://localhost:${PORT}`)
})