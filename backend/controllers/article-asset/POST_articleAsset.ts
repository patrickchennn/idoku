import { POST_ReqBodyArticle } from "@eraiyomi/types/Article";
import chalk from "chalk";
import { Request,Response } from "express"


/**
 * @desc Create an article asset. By saying asset, I mean such things like images, videos, the actual content
 * @route POST /api/article-asset
 * @access private not accessable to public
 */
export const POST_articleAsset =  async (
  req: Request<{}, {}, POST_ReqBodyArticle>,
  res: Response
) => {
  console.log(chalk.yellow("[API] POST /api/article-asset"))


}
