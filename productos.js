

const { match } = require('assert')
const express = require( 'express' )
const app = express()


// const { Console } = require('console')   // AVERIGUAR PARA QUE SIRVE

const fs = require( 'fs' )
const { parse } = require('path')



class productos{
    constructor( name, price,  img ){
        this.name = name,
        this.price = price,
        this.img = img
        this.id = 1
    }

    writeProduct( product){ 
        (
            async() =>{
                await fs.promises.readFile( 'productos.txt', "utf-8" )
                    .then( listProduct =>{
                        let listJson = JSON.parse( listProduct)
                        for( let i = 0; i < listJson.length; i++){
                            this.id++
                        }
                        product.id = this.id
                        listJson.push( product )
                            console.log(listJson)
                        fs.promises.writeFile( 'productos.txt', JSON.stringify( listJson, null, 4 ))
                }).catch( error => console.log( `Ocurrio un error : ${error}`))
            }
            
        )()
    }

    getProduct(){
        (
            async()=>{
                const product = await fs.promises.readFile( 'productos.txt', 'utf-8' )
                let productJson = JSON.parse( product )
                app.get( '/', ( require, resolve)=>{
                    resolve.send( productJson )
                })
            }
        )()
    }

    getProductRandom(){
        (
            async() =>{
                const product = await fs.promises.readFile( 'productos.txt', 'utf-8' )
                let productJson = JSON.parse( product )
                let idRandom = parseInt( Math.random()*(7 - 1)+ 1)
                let productRandom = productJson.find( e => e.id == idRandom)

                app.get( '/', ( req, res ) =>{
                    res.send( productRandom )
                })
            }

        )()
    }
}

const product1 = new productos( 'Caramelos', 3499, 'img')
// product1.writeProduct( product1 )

// product1.getProduct()
product1.getProductRandom()

const PORT =  process.env.PORT || 8989

const product =  app.listen( 
    PORT, () => {
        console.log( `Servidor Funcionando en el puerto ${ product.address().port }`)
    }
)