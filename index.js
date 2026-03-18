import express from 'express'

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


app.listen(PORT,()=>{
    console.log(`serivdor http://localhost:${PORT}`)
})