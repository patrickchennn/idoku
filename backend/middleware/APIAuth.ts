import chalk from "chalk";
import { NextFunction, Response, Request } from "express"
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()


// Replace this with your secret API key
const apiKey = process.env.MY_API_KEY;
// console.log("apiKey=",apiKey)

// Middleware to check for the API key in the request header
export default function APIAuth(req: Request, res: Response, next: NextFunction,isNext=false) {
  const providedApiKey = req.header('Authorization');
  console.log(chalk.yellow("[middleware]: @APIAuth"))
  console.log(chalk.yellow(`[middleware]: Authorizing for request: ${req.method} ${req.path}`))
  // console.log(`providedApiKey=${providedApiKey}`)
  // console.log(`apiKey=${apiKey}`)
  // console.log(providedApiKey===`Bearer ${apiKey}`)

  if (
    providedApiKey && 
    providedApiKey.startsWith("Bearer") &&
    providedApiKey === `Bearer ${apiKey}`
  ) {
    console.log(chalk.green("[middleware] 200 Authorized; API key is valid\n"))
    if(isNext) next()
    return
  } else {
    const msg = `You are not allowed to do anything with: ${req.method} ${req.path}. API key is invalid`

    console.error(chalk.red(`[middleware] 403 Forbidden. ${msg}\n`))

    res.header('WWW-Authenticate', 'Bearer realm="Restricted Area"');
    res.status(403)

    next(new Error(msg))
    // return res.json(403).json({message:msg})
  }
}