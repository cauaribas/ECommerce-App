import { app } from './app';
import { PORT } from './secrets';

app
    .listen({ 
        port: Number(PORT) 
    })
    .then(() => { 
        console.log(`Server is running on http://localhost:${PORT}`) 
    })
    .catch((err) => { 
        console.error(err) 
    });