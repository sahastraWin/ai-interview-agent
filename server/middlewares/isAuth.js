import jwt from "jsonwebtoken"


const isAuth = async (req,res,next) => {
    try {
        let token = req.cookies?.token
        const authHeader = req.headers.authorization
        if(!token && authHeader && authHeader.startsWith("Bearer ")){
            token = authHeader.slice(7)
        }

        if(!token){
            return res.status(401).json({message:"user does not have a token"})
        }
        let verifyToken
        try {
            verifyToken = jwt.verify(token , process.env.JWT_SECRET)
        } catch (e) {
            return res.status(401).json({message:"user does not have a valid token"})
        }
        req.userId = verifyToken.userId

        next()
   

    } catch (error) {
        return res.status(500).json({message:`isAuth error ${error}`})
    }
    
}

export default isAuth