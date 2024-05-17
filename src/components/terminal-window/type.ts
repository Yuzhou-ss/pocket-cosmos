interface commandExample {
  des: string;
  cmd: string;
}

// 命令描述
export interface commandDesType {
  key: string;
  title: string;
  group?: string;
  usage: string;
  description: string;
  example: commandExample[];
}

// 命令
export interface commandType {
  key: string;
  callback: Function;
}

// 消息结构
export interface msgType {
  type: string;
  class?: string;
  tag?: string;
  content: string;
}
