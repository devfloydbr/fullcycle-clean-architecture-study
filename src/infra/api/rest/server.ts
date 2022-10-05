import 'dotenv/config'
import { app } from './express'

const port: number = Number(process.env.PORT) || 3333

app.listen(port, () => console.log(`Server started on port ${port} 🚀`))
