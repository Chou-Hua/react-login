import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { apiMessageData } from "../atoms/messageAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Loading } from "./LoadingOverlay";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import WarningIcon from '@mui/icons-material/Warning';

interface iconType {
  icon: String,
}

type textareaType = {
  className?: string,
  placeholder?: string,
  onChange?: any,
  value?: string,
  content?: string
}
type leaveMessageType = {
  messageID?: string,
  id?: string,
  name?: string,
  time?: string,
  message?: any,
}
type messageType = {
  id?: string,
  name?: string,
  time?: string,
  message?: any,
  comment: Array<object>
}

const isHaveText = (data: string) => {
  let isEmpty = data.length === 0
  let isHaveSpace = data.replace(/(^s*)|(s*$)/g, "").length == 0
  return isEmpty && isHaveSpace
}

const getAccountName = () => {
  const jwt = JSON.parse(JSON.stringify(localStorage.getItem('jwt')))
  const jwtJson: any = jwt_decode<Object>(jwt)
  return jwtJson?.sub;
}

const MessageTextArea = (props: textareaType) => {
  return (
    <div>
        <textarea className={props.className} placeholder={props.placeholder}
                  value={props.value}
                  onChange={props.onChange}>{props.content}
          required
        </textarea>
    </div>
  )
}

//文章留言的元件 編輯留言
const LeaveMessageComponent = (props: leaveMessageType) => {
  const [apiMessage, setApiMessage] = useRecoilState(apiMessageData);
  const [loadingOpen, setLoadingOpen] = React.useState(false);
  const handleLoadingOpen = () => setLoadingOpen(true);
  const handleLoadingClose = () => setLoadingOpen(false);
  const getAllMessage = async () => {
    await axios.get('https://python-flask-chouhua.herokuapp.com/message/').then((res) => {
      setApiMessage(res.data);
    })
  }
  const [isClickLeaveEditBtn, setIsLeaveClickEditBtn] = React.useState(true);
  const [leaveMessage, setLeaveMessage] = useState('');
  useEffect(() => {
    const message = props.message;
    setLeaveMessage(message);
  }, [props.message])
  const editCommentMessage = async () => {

    let request = {
      messageID: props.messageID,
      commentID: props.id,
      message: leaveMessage,
      name: getAccountName()
    }
    await axios.put('https://python-flask-chouhua.herokuapp.com/message/editComment', request).then();
  }
  const getLeaveMessageData = async () => {
    handleLoadingOpen();
    await editCommentMessage();
    await getAllMessage().then();
    setIsLeaveClickEditBtn(!isClickLeaveEditBtn);
    handleLoadingClose();
  }
  const deleteComment = async () => {
    handleClose();
    handleLoadingOpen();
    let request = {
      messageID: props.messageID,
      commentID: props.id
    }
    // @ts-ignore
    await axios.delete('https://python-flask-chouhua.herokuapp.com/message/deleteComment', {data: request}).then();
    handleLoadingClose();
    await getAllMessage().then();
  }
  const openCheckModal = () => {
    setOpen(true);
  }
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className='leave-message-main-leave'>
      <Loading isLoading={loadingOpen}/>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <div className="d-flex">
            <WarningIcon className="delete-warning-icon" fontSize={"large"}/>
            <div className="delete-article-text">{"Warning!!"}</div>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="delete-text">
            確定刪除此留言?
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button variant={"text"} className="message-edit-button " onClick={deleteComment} autoFocus>
            確認
          </Button>
        </DialogActions>
      </Dialog>

      <div className='d-flex padding-left-10'>
        <div className='message-name'>{(props.name !== '' && props.name !== "admin") ? props.name : '匿名人士'}</div>
        <div className='message-date'>&nbsp;{"在 " + props.time + ' 發布了這則訊息'}</div>
      </div>
      <div className='message-data'>
        <div className='padding-left-10'>
          {props.message}
          <div className='d-flex float-right'>
            {props.name === getAccountName() ?
              <div>
                <Button variant="text" className="message-edit-button"
                        onClick={() => {
                          setIsLeaveClickEditBtn(!isClickLeaveEditBtn);
                          setLeaveMessage(props.message)
                        }}
                >
                  {isClickLeaveEditBtn ? '編輯留言' : '取消'}
                </Button>
                <Button variant="text" className="message-delete-button" onClick={openCheckModal}>
                  刪除留言
                </Button>
              </div> : <></>
            }
          </div>
        </div>

        <div className='leave-edit-message-text'>
          {!isClickLeaveEditBtn ?
            <>
              <MessageTextArea className='leave-message-text-filed' value={leaveMessage}
                               onChange={(e: any) => {
                                 setLeaveMessage(e.target.value)
                               }
                               }
                               content={props.message}/>
              <Button variant="text" className="message-edit-button margin-left-minus-15"
                      disabled={isHaveText(leaveMessage)}
                      onClick={getLeaveMessageData}>送出</Button>
            </> : ''
          }
        </div>
      </div>

    </div>
  )
}

//留言+文章留言
const MessageComponent = (props: messageType) => {
  const [apiMessage, setApiMessage] = useRecoilState(apiMessageData);
  const [isClickReplay, setIsClickReply] = React.useState(true);
  const [isClickEditBtn, setIsClickEditBtn] = React.useState(true);
  const [replyMessage, setReplyMessage] = useState('')
  //編輯文章
  const [editMessage, setEditMessage] = useState('')
  const [loadingOpen, setLoadingOpen] = React.useState(false);
  const handleLoadingOpen = () => setLoadingOpen(true);
  const handleLoadingClose = () => setLoadingOpen(false);
  useEffect(() => {
    const message = props.message;
    setEditMessage(message);
  }, [props.message])
  const getAllMessage = async () => {
    handleLoadingOpen();
    await axios.get('https://python-flask-chouhua.herokuapp.com/message/').then((res) => {
      setApiMessage(res.data);
    })
    handleLoadingClose();
  }
  const submitLeaveMessage = async () => {
    //更新留言
    if (replyMessage == '') {
      return
    } else {
      let request = {
        messageID: props.id,
        message: replyMessage,
        name: getAccountName()
      }
      await axios.post('https://python-flask-chouhua.herokuapp.com/message/comment', request).then();
    }
  }
  const submitReplyMessageData = async () => {
    handleLoadingOpen();
    await submitLeaveMessage();
    await getAllMessage().then();
    handleLoadingClose();
    setIsClickReply(!isClickReplay);
  }
  const editLeaveMessage = async () => {
    //更新文章
    let request = {
      messageID: props.id,
      message: editMessage
    }
    await axios.put('https://python-flask-chouhua.herokuapp.com/message/editArticle', request).then();
  }
  const getEditMessageData = async () => {
    handleLoadingOpen();
    await editLeaveMessage();
    await getAllMessage().then();
    handleLoadingClose();
    setIsClickEditBtn(!isClickEditBtn);
  }
  const getAccountName = () => {
    const jwt = JSON.parse(JSON.stringify(localStorage.getItem('jwt')))
    const jwtJson: any = jwt_decode<Object>(jwt)
    return jwtJson?.sub;
  }
  const deleteArticle = async () => {
    handleClose();
    handleLoadingOpen();
    await axios.delete('https://python-flask-chouhua.herokuapp.com/message/deleteArticle?id=' + props.id).then();
    handleLoadingClose();
    await getAllMessage().then();
  }
  const openCheckModal = () => {
    setOpen(true);
  }
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='leave-message-main'>
      <Loading isLoading={loadingOpen}/>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <div className="d-flex">
            <WarningIcon className="delete-warning-icon" fontSize={"large"}/>
            <div className="delete-article-text">{"Warning!!"}</div>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="delete-text">
            確定刪除此文章?
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button variant={"text"} className="message-edit-button " onClick={deleteArticle}>
            確認
          </Button>
        </DialogActions>
      </Dialog>

      <div className='leave-message-div'>
        <div>
          <div className='d-flex'>
            <div className='message-name'>{props.name !== '' && props.name !== "admin" ? props.name : '匿名人士'}</div>
            <div className='message-date'>&nbsp;{"在 " + props.time + ' 發布了這則訊息'}</div>
          </div>
          <div className='message-data'>
            {props.message}
            {
              props.name === getAccountName() ?
                <div className='d-flex float-right'>
                  <Button variant="text" className="message-edit-button"
                          onClick={() => {
                            setIsClickEditBtn(!isClickEditBtn)
                            setEditMessage(props.message)
                          }}
                  >
                    {isClickEditBtn ? '編輯文章' : '取消'}
                  </Button>
                  <Button variant="text" className="message-delete-button" onClick={openCheckModal}>
                    刪除文章
                  </Button>
                </div> : <></>
            }
            {!isClickEditBtn ?
              <>
                <MessageTextArea className='leave-message-text-filed'
                                 value={editMessage}
                                 onChange={(e: any) => {
                                   setEditMessage(e.target.value)
                                 }
                                 }
                                 content={props.message}/>
                <Button variant="text" className="message-edit-button margin-left-minus-15"
                        disabled={isHaveText(editMessage)}
                        onClick={getEditMessageData}>送出</Button>
              </> : ''
            }
          </div>
          {props.comment.map((item: leaveMessageType, i) => (
            <LeaveMessageComponent
              id={item.id} messageID={props.id} name={item.name} time={item.time} message={item.message} key={i}/>
          ))}
        </div>
        <Button variant="text" className="message-edit-button margin-left-minus-15"
                onClick={() => {
                  setIsClickReply(!isClickReplay);
                  setReplyMessage('')
                }}>
          {isClickReplay ? '回覆' : '取消'}
        </Button>
        <div>
          {!isClickReplay ?
            <>
              <MessageTextArea className='leave-message-text-filed' placeholder='輸入想說的話'
                               value={replyMessage} onChange={(e: any) => {
                setReplyMessage(e.target.value)
              }}
              />
              <Button variant="text" className="message-edit-button margin-left-minus-15" disabled={true}
                      onClick={submitReplyMessageData}>送出</Button>
            </>
            : ''}
        </div>
      </div>
    </div>
  )
}


const Flake = (props: iconType) => {
  return (
    <div className='snowflake'>{props.icon}</div>
  )
}

const fakeData = [
  {
    name: 'Andy',
    time: '2022/06/09 15:07',
    message: 'CCCC',
    comment: [
      {
        name: 'Ken',
        time: '2022/07/01 11:11',
        message: 'hello'
      },
      {
        name: 'CCC',
        time: '2022/07/01 12:11',
        message: 'ASSAS'
      }
    ]
  },
  {
    name: 'Ken',
    time: '2022/06/09 15:07',
    message: '你好',
    comment: [
      {
        name: 'Ken',
        time: '2022/07/01 11:11',
        message: 'hello'
      },
      {
        name: 'CCC',
        time: '2022/07/01 12:11',
        message: 'ASSAS'
      }
    ]
  },
  {
    name: 'Mike',
    time: '2022/06/09 15:07',
    message: 'FUCK',
    comment: [
      {
        name: 'Ken',
        time: '2022/07/01 11:11',
        message: 'hello'
      },
      {
        name: 'CCC',
        time: '2022/07/01 12:11',
        message: 'ASSAS'
      }
    ]
  }
]

const Main = () => {
  const [apiMessage, setApiMessage] = useRecoilState(apiMessageData);
  const [isApiPass, setIsApiPass] = useState(false);
  const getAllMessage = async () => {
    handleLoadingOpen();
    await axios.get('https://python-flask-chouhua.herokuapp.com/message/').then((res) => {
      setApiMessage(res.data);
      setIsApiPass(true);
    })
    handleLoadingClose();
  }
  useEffect(() => {
    getAllMessage().then()
  }, [])
  const [loadingOpen, setLoadingOpen] = React.useState(false);
  const handleLoadingOpen = () => setLoadingOpen(true);
  const handleLoadingClose = () => setLoadingOpen(false);
  const [messageData, setMessage] = useState('');
  const submitMessage = async () => {
    handleLoadingOpen();
    let request = {
      message: messageData,
      name: getAccountName()
    }
    await axios.post('https://python-flask-chouhua.herokuapp.com/message/add', request).then();
    handleLoadingClose();
    getAllMessage().then();
    setMessage('');

  }
  const icon = ['❅', '❆', '✿', '❆', '❅', '❆', '❀', '❆', '❅', '❆', '✿', '❆', '❅', '❆', '❀', '❆']

  return (
    <main>
      <Loading isLoading={loadingOpen}/>
      <div className='main-bg'>
        <div className='text-filed-div'>
          <h1 className='title-label'>發牢騷留言板</h1>
          <MessageTextArea
            className='text-filed' placeholder='輸入想說的話' onChange={(e: any) => {
            setMessage(e.target.value)
          }}
            value={messageData}
          />
          <Button variant="outlined" className="message-submit-button" onClick={submitMessage}
                  disabled={isHaveText(messageData)}>送出</Button>
          {isApiPass ?
            <div>
              {
                apiMessage && apiMessage?.map((item: messageType, i) =>
                  (<MessageComponent
                    id={item.id ? item.id : ''}
                    name={item.name}
                    time={item.time}
                    message={item.message}
                    comment={item.comment ? item.comment : []}
                    key={i}/>)
                )
              }
            </div> : <></>
          }
        </div>
        <div>
          {icon.map((item, i) => (
            <Flake key={i} icon={item}/>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Main;