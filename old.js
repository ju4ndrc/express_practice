//ruta opcionales
app.get('/a{b}cd',(req,res)=>{
    return res.send('abcd o acd')
})
//comdin
app.get('/aa*aa',(req,res)=>{
    return res.send('aaa(comodin)aaa')
})