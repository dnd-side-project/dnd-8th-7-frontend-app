/**
 * TODO dev, prod 구분하여 삽입
 */
export const BASE_URL = 'http://localhost:3000';
// export const BASE_URL =
//   'https://dnd-8th-7-frontend-git-staging-eun-seong.vercel.app';
export const HARUBLOCK_ORIGIN = 'https://harublock.vercel.app';

export const API_URL = 'https://api.harublock.store';

export enum STACK_NAVIGATION_PATH {
  SPLASH = 'SPLASH',
  ONBOARDING = 'ONBOARDING',
  MAIN = 'MAIN',
  FULL_WEBVIEW = 'FULL_WEBVIEW',
  OAUTH_WEBVIEW = 'OAUTH_WEBVIEW',
}

export enum BOTTOM_TAB_NAVIGATION_PATH {
  HOME = 'HOME',
  REPORT = 'REPORT',
  SOCIAL = 'SOCIAL',
  PROFILE = 'PROFILE',
}
