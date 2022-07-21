import { atom } from "recoil";

export const messageData = atom({
  key: "messageData",
  default: ''
})
export const leaveMessageData = atom({
  key: "leaveMessageData",
  default: ''
})

export const apiMessageData = atom({
  key: "apiMessageData",
  default: []
})