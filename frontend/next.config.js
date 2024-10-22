// @ts-check

const { PHASE_DEVELOPMENT_SERVER } = require("next/dist/shared/lib/constants")

 


module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      /* development only config options here */
      env:{
        URL_API:"http://localhost:8001/api",
      },
      experimental: {
        serverActions: true,
      },
    }
  }
 
  return {
    /* config options for all phases except development here */
    env:{
      URL_API:"http://localhost:8999/api",
    },
    experimental: {
      serverActions: true,
    },
    output: "standalone",
    compiler: {
      removeConsole:{
        exclude: ["error","trace"]
      }
    },
  }
}