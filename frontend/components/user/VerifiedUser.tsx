import { User } from "@patorikkuuu/eraiyomi-types"


import { getArticlesAnalytic } from "@/services/analytics/articleAnalyticService"
import chalk from "chalk"
import UserBtns from "./verified-user/UserBtns"
import { GET_articlesAsset } from "@/services/article-asset/GET_articlesAsset"
import getArticles from "@/services/article/getArticles"

interface VerifiedUserProps{
  user: User
}
export default async function VerifiedUser({user}:VerifiedUserProps){
  console.log(chalk.blueBright.bgBlack("@VerifiedUser()"))

  const articles = await getArticles({sort:"newest" })
  // console.log("articles=",articles)

  if(!articles.data){
    return (
      <pre>
        {JSON.stringify(articles, null, 2)}
      </pre>
    )
  }

  const articlesAnalytic = await getArticlesAnalytic()
  // console.log("articlesAnalytic=",articlesAnalytic)

  const articlesAsset = await GET_articlesAsset()
  // console.log("articlesAsset=",articlesAsset)


   

  return (
    <div className="my-0 mx-auto rounded w-1/2 bg-white flex gap-x-1 dark:dark-single-component">
      <UserBtns 
        user={user} 
        articles={articles.data}
        articlesAnalytic={articlesAnalytic}
        articlesAsset={articlesAsset}
      />

      <div className="w-full" id="show-selected-component"></div>
    </div>
  )
}