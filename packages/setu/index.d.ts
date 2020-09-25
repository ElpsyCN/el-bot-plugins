/**
 * 色图格式
 */
interface SetuImage {
  url: string;
}

/**
 * 色图配置项
 */
export interface SetuOptions {
  url: string;
  proxy: string;
  match: check.Match[];
  reply: string;
}
