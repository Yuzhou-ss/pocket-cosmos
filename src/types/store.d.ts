// 类型声明文件，可选
export interface RootState {
  user: import("./modules/user").UserState;
  search: import("./modules/search").SearchState;
}
