import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'


export const blogRouter = new Hono<{
    Bindings : {
        DATABASE_URL: string,
        JWT_SCERET : string
    },
    Variables : {
        userId : string
    }
}>()

blogRouter.use('/*', async (c,next) =>{
    const authHeader = c.req.header('Authorization') || ""
    
    const user =  await verify(authHeader, c.env.JWT_SCERET)

    console.log("verified token",user)
        
    if(user){
        c.set("userId",user.id)
        await next()
    } else {
        c.status(403)
        return c.json({
            message : "You are not logged in"
        })
    }
    
})

blogRouter.post('/', async (c) =>{
    const userId = c.get('userId')
    const prisma = new PrismaClient({
        datasourceUrl : c.env?.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const post = await prisma.post.create({
        data : {
            title : body.title,
            content : body.content,
            authorId : userId
        }
    })

    return c.json({
        id : post.id
    })
})


blogRouter.put('/',async (c) =>{

    const userId = c.get('userId')
    const prisma = new PrismaClient({
        datasourceUrl : c.env?.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const post = await prisma.post.update({
        where : {
            id : body.id
        },
        data : {
            title : body.title,
            content : body.content,
        }
    })

    return c.json({
        id : post.id
    })
})

blogRouter.get('/' ,async(c)=>{

    const userId = c.get('userId')
    const prisma = new PrismaClient({
        datasourceUrl : c.env?.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json();
    try{
        const post = await prisma.post.findFirst({
            where:{
                id : body.id
            }
        })
    
        return c.json({
            post
        })
    }catch(e){
        c.status(411)
        return c.json({
            message : "error"
        })
    }

})