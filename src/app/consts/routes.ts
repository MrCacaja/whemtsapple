export enum AppRoute {
  ROOT = 'root',

  START = 'start',
  MAIN = 'main',

  REGISTER = 'register',
  LOGIN = 'login',

  CHAT_LIST = 'chat-list',
  CHAT = 'chat',
  PROFILE = 'profile'
}

export const APP_PATHS = {
  [AppRoute.START]: {
    [AppRoute.ROOT]: AppRoute.START,
    [AppRoute.REGISTER]: `${AppRoute.START}/${AppRoute.REGISTER}`,
    [AppRoute.LOGIN]: `${AppRoute.START}/${AppRoute.LOGIN}`
  },
  [AppRoute.MAIN]: {
    [AppRoute.ROOT]: AppRoute.MAIN,
    [AppRoute.CHAT]: AppRoute.CHAT,
    [AppRoute.PROFILE]: AppRoute.PROFILE
  }
}
