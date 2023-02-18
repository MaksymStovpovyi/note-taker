import express from 'express'
import path from 'path'
const __dirname = path.resolve()

const PORT = process.env.PORT ?? 3001
const app = express()

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
})

app.get('/notes', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'notes.html'));
})

app.listen(PORT, () => {
    console.log(`start server ${PORT} ^_^ ...`)
})