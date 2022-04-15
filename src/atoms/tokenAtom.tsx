import { atom } from "recoil";

export const isHaveToken = atom({
  key: "isHaveToken",
  default: false
})
export const loginAccount = atom({
  key: "loginAccount",
  default: ''
})
export const isChangePassword = atom({
  key: "isChangePassword",
  default: false
})
export const nowRoutePath = atom({
  key: "nowRoutePath",
  default: '/'
})