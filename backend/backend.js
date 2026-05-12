import express from 'express'
import cluster from 'node:cluster'
import { availableParallelism } from 'node:os'

const numCPUS = availableParallelism() // total ketala cpu 6e aena mate lakhiyu 6e ae chaeck karase.
console.log(numCPUS)


if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`)

    // total jetala cpu hase pc ma aetala cluster uper fork() karse aetale behinf the screen child process 6e multiple process ni copy banai dese 

    for (let i = 0; i <= numCPUS; i++) {
        cluster.fork()
    }

    // koi process exit thase to aa log thase 
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`)
    })
} else {
    //uper primary block ma server start nahi thatu ae khali fork karase.
    const app = express()
    const port = process.env.PORT || 8080

    app.listen(port, () => {
        console.log(`server is Started ${port}`)
    })

}