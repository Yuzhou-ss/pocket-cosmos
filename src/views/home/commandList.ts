import { type commandDesType} from "./type"
export const commandList:commandDesType[] = [
  {
    key: "baidu",
    title: "Baidu",
    group: "search",
    usage: "Baidu [keyword]",
    description: "Use Baidu search engine to search for keywords",
    example: [
      {
        des: "Use Baidu search engine to search for '前端学习路线'.",
        cmd: "Baidu 前端学习路线",
      },
    ],
  },

  {
    key: "百度",
    title: "Baidu",
    group: "search",
    usage: "Baidu [keyword]",
    description: "Use Baidu search engine to search for keywords",
    example: [
      {
        des: "Use Baidu search engine to search for '前端学习路线'.",
        cmd: "百度 前端学习路线",
      },
    ],
  },
];
