import { type commandDesType} from "./type"
export const commandList:commandDesType[] = [
  {
    key: "baidu",
    title: "Baidu",
    group: "search",
    usage: "baidu [keyword]",
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

  {
    key: "bilibili",
    title: "Bilibili",
    group: "search",
    usage: "bilibili [keyword]",
    description: "Use Bilibili search engine to search for keywords",
    example: [
      {
        des: "Use Bilibili search engine to search for '前端学习路线'.",
        cmd: "Bilibili 前端学习路线",
      },
    ],
  },

  {
    key: "哔哩哔哩",
    title: "Bilibili",
    group: "search",
    usage: "哔哩哔哩 [keyword]",
    description: "Use Bilibili search engine to search for keywords",
    example: [
      {
        des: "Use Bilibili search engine to search for '前端学习路线'.",
        cmd: "哔哩哔哩 前端学习路线",
      },
    ],
  },

  {
    key: "csdn",
    title: "CSDN",
    group: "search",
    usage: "csdn [keyword]",
    description: "Use CSDN search engine to search for keywords",
    example: [
      {
        des: "Use CSDN search engine to search for '前端学习路线'.",
        cmd: "csdn 前端学习路线",
      },
    ],
  },
  {
    key: "translate",
    title: "trabslate",
    group: "translate",
    usage: "trabslate [param]",
    description: "Translate input using Baidu Translate.",
    example: [
      {
        des: "Translate '我只是一个Ctrl CV工程' into English using Baidu Translate.",
        cmd: "translate 前端学习路线",
      },
      {
        des: "Translate 'may the wind be at your back' into Chinese using Baidu Translate.",
        cmd: "translate may the wind be at your back",
      },
    ],
  },
  {
    key: "翻译",
    title: "翻译",
    group: "translate",
    usage: "翻译 [param]",
    description: "Translate input using Baidu Translate.",
    example: [
      {
        des: "Translate '我只是一个Ctrl CV工程' into English using Baidu Translate.",
        cmd: "translate 前端学习路线",
      },
      {
        des: "Translate 'May the wind be at your back' into Chinese using Baidu Translate.",
        cmd: "translate May the wind be at your back",
      },
    ],
  },
  {
    key: "login",
    title: "Login",
    group: "login",
    usage: "login",
    description: "Log in using the command line.",
    example: [
      {
        des: "Log in using the command line.",
        cmd: "login",
      }
    ],
  },

  {
    key: "logout",
    title: "Logout",
    group: "login",
    usage: "logout",
    description: "Log out using the command line.",
    example: [
      {
        des: "Log out using the command line.",
        cmd: "logout",
      }
    ],
  },
  {
    key: "bg",
    title: "BG",
    group: "bg",
    usage: "BG [param1] [param2]",
    description: "Replace the wallpaper according to the input.",
    example: [
      {
        des: "Randomly replace the wallpaper.",
        cmd: "bg",
      },
      {
        des: "View all paid wallpaper types.",
        cmd: "bg -t",
      },
      {
        des: "Randomly replace the wallpaper based on the input type.",
        cmd: "bg -t 动漫",
      },
      {
        des: "Search for wallpapers based on input keywords and replace.",
        cmd: "bg -s 英雄联盟",
      },
      {
        des: "View all paid wallpaper types.",
        cmd: "bg --set",
      },
    ],
  },
  {
    key: "intro",
    title: "Intro",
    group: "author",
    usage: "intro",
    description: "View author information.",
    example: [
      {
        des: "View author information.",
        cmd: "intro",
      }
    ],
  },
  {
    key: "search",
    title: "Search",
    group: "search",
    usage: "search [param1] [param2]",
    description: "Set the default search engine.",
    example: [
      {
        des: "Set Baidu as the default search engine.",
        cmd: "search --set baidu",
      },
      {
        des: "Restore the initial value.",
        cmd: "search --reset",
      }
    ],
  },
];
