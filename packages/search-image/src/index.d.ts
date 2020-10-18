import Bot from "el-bot";
import { Options as SagiriOptions } from "sagiri";
/**
 * 搜图设置
 */
interface SearchImageOptions {
  token: string;
  options?: SagiriOptions;
}
/**
 * 搜图 [SauceNAO](https://saucenao.com/)
 * @param ctx
 * @param config
 */
export default function searchImage(
  ctx: Bot,
  options: SearchImageOptions
): Promise<void>;
export {};
