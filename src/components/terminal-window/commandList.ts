import { type commandDesType} from "./type"
export const commandList:commandDesType[] = [
  {
    key: "baidu",
    title: "Baidu",
    group: "search",
    usage: "baidu [keyword]",
    description: "使用百度搜索引擎搜索关键字",
    example: [
      {
        des: "使用百度搜索引擎搜索 '前端学习路线'.",
        cmd: "Baidu 前端学习路线",
      },
    ],
  },
  {
    key: "百度",
    title: "Baidu",
    group: "search",
    usage: "Baidu [keyword]",
    description: "使用百度搜索引擎搜索关键字",
    example: [
      {
        des: "使用百度搜索引擎搜索 '前端学习路线'.",
        cmd: "百度 前端学习路线",
      },
    ],
  },

  {
    key: "bilibili",
    title: "Bilibili",
    group: "search",
    usage: "bilibili [keyword]",
    description: "使用哔哩哔哩搜索关键字",
    example: [
      {
        des: "使用哔哩哔哩搜索 '前端学习路线'.",
        cmd: "Bilibili 前端学习路线",
      },
    ],
  },

  {
    key: "哔哩哔哩",
    title: "Bilibili",
    group: "search",
    usage: "哔哩哔哩 [keyword]",
    description: "使用哔哩哔哩搜索关键字",
    example: [
      {
        des: "使用哔哩哔哩搜索 '前端学习路线'.",
        cmd: "哔哩哔哩 前端学习路线",
      },
    ],
  },

  {
    key: "csdn",
    title: "CSDN",
    group: "search",
    usage: "csdn [keyword]",
    description: "使用CSDN搜索关键字",
    example: [
      {
        des: "使用CSDN搜索 '前端学习路线'.",
        cmd: "csdn 前端学习路线",
      },
    ],
  },
  {
    key: "translate",
    title: "trabslate",
    group: "translate",
    usage: "trabslate [param]",
    description: "使用百度翻译翻译内容，目前支持英译汉和汉译英",
    example: [
      {
        des: "将 '我只是一个Ctrl CV工程' 翻译成英文",
        cmd: "translate 前端学习路线",
      },
      {
        des: "将 'may the wind be at your back' 翻译成中文",
        cmd: "translate may the wind be at your back",
      },
    ],
  },
  {
    key: "翻译",
    title: "翻译",
    group: "translate",
    usage: "翻译 [param]",
    description: "使用百度翻译翻译内容，目前支持英译汉和汉译英",
    example: [
      {
        des: "将 '我只是一个Ctrl CV工程' 翻译成英文",
        cmd: "translate 前端学习路线",
      },
      {
        des: "将 'May the wind be at your back' 翻译成中文",
        cmd: "translate May the wind be at your back",
      },
    ],
  },
  {
    key: "login",
    title: "Login",
    group: "login",
    usage: "login",
    description: "使用终端命令登录",
    example: [
      {
        des: "使用终端命令登录",
        cmd: "login",
      }
    ],
  },

  {
    key: "logout",
    title: "Logout",
    group: "login",
    usage: "logout",
    description: "使用终端命令退出登录",
    example: [
      {
        des: "使用终端命令退出登录",
        cmd: "logout",
      }
    ],
  },
  {
    key: "bg",
    title: "BG",
    group: "bg",
    usage: "BG [param1] [param2]",
    description: "根据输入关键字更换壁纸",
    example: [
      {
        des: "随机更换壁纸",
        cmd: "bg",
      },
      {
        des: "查看应用支持的所有壁纸类型",
        cmd: "bg -t",
      },
      {
        des: "随机更换类型为 '动漫' 的壁纸",
        cmd: "bg -t 动漫",
      },
      {
        des: "随机搜索包含 '英雄联盟' 元素的壁纸并更换",
        cmd: "bg -s 英雄联盟",
      },
      {
        des: "将当前壁纸设置为默认壁纸",
        cmd: "bg --set",
      },
      {
        des: "重置默认壁纸",
        cmd: "bg --reset",
      },
    ],
  },
  {
    key: "intro",
    title: "Intro",
    group: "author",
    usage: "intro",
    description: "查看作者的自我介绍",
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
    description: "设置默认搜索引擎",
    example: [
      {
        des: "设置默认搜索引擎为baidu，设置后使用百度搜索引擎搜索关键字时可以省略 baidu 命令",
        cmd: "search --set baidu",
      },
      {
        des: "重置默认搜索引擎",
        cmd: "search --reset",
      }
    ],
  },
  {
    key: "weather",
    title: "Weather",
    group: "weather",
    usage: "weather [param1] [param2]",
    description: "设置天气效果，若未设置则默认根据当前时刻和地区的天气来呈现天气效果",
    example: [
      {
        des: "查看支持的天气效果",
        cmd: "search -l",
      },
      {
        des: "设置天气效果为snow，设置后天气效果切换为下雪天",
        cmd: "search --set snow",
      },
      {
        des: "重置默认天气效果",
        cmd: "search --reset",
      }
    ],
  },
   {
    key: "cmd",
    title: "cmd",
    group: "cmd",
    usage: "cmd",
    description: "在web环境中打开本地终端",
    example: [
      {
        des: "打开本地终端",
        cmd: "cmd",
      }
    ],
  },
];
