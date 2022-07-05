import Button from "@mui/material/Button";
import React from "react";


interface iconType {
  icon: String,
}

type textareaType = {
  className?: string,
  placeholder?: string,
  onChange?: any
  content?: string
}

type leaveMessageType = {
  name?: string,
  Date?: string,
  message?: string,
}
type messageType = {
  name?: string,
  Date?: string,
  message?: string,
  leaveMessage: Array<object>
}


const fakeData = [
  {
    name: 'Andy',
    Date: '2022/06/09 15:07',
    message: 'CCCC',
    leaveMessage: [
      {
        name: 'Ken',
        Date: '2022/07/01 11:11',
        message: 'hello'
      },
      {
        name: 'CCC',
        Date: '2022/07/01 12:11',
        message: 'ASSAS'
      }
    ]
  },
  {
    name: 'Ken',
    Date: '2022/06/09 15:07',
    message: '你好',
    leaveMessage: [
      {
        name: 'Ken',
        Date: '2022/07/01 11:11',
        message: 'hello'
      },
      {
        name: 'CCC',
        Date: '2022/07/01 12:11',
        message: 'ASSAS'
      }
    ]
  },
  {
    name: 'Mike',
    Date: '2022/06/09 15:07',
    message: 'FUCK',
    leaveMessage: [
      {
        name: 'Ken',
        Date: '2022/07/01 11:11',
        message: 'hello'
      },
      {
        name: 'CCC',
        Date: '2022/07/01 12:11',
        message: 'ASSAS'
      }
    ]
  }
]

const Main = () => {
  const Flake = (props: iconType) => {
    return (
      <div className='snowflake'>{props.icon}</div>
    )
  }
  const MessageTextArea = (props: textareaType) => {
    return (
      <div><textarea className={props.className} placeholder={props.placeholder}
                     onChange={props.onChange}>{props.content}</textarea>
      </div>
    )
  }
  const LeaveMessage = (props: leaveMessageType) => {
    const [isClickLeaveEditBtn, setIsLeaveClickEditBtn] = React.useState(true);
    return (
      <div className='leave-message-main-leave'>
        <div className='d-flex padding-left-10'>
          <div className='message-name'>{props.name ? props.name : '匿名人士'}</div>
          <div className='message-date'>&nbsp;{"在 " + props.Date + ' 發布了這則訊息'}</div>
        </div>
        <div className='message-data'>
          <div className='padding-left-10'>
            {props.message}
          </div>
          <div className='d-flex float-right'>
            <Button variant="text" className="message-edit-button"
                    onClick={() => {
                      setIsLeaveClickEditBtn(!isClickLeaveEditBtn)
                    }}
            >
              {isClickLeaveEditBtn ? '編輯留言' : '取消'}
            </Button>
            <Button variant="text" className="message-delete-button">
              刪除留言
            </Button>
          </div>
          <div className='leave-edit-message-text'>
            {!isClickLeaveEditBtn ?
              <>
                <MessageTextArea className='leave-message-text-filed'
                                 content={props.message}/>
                <Button variant="text" className="message-edit-button margin-left-minus-15">送出</Button>
              </> : ''
            }
          </div>
        </div>

      </div>
    )
  }
  const Message = (props: messageType) => {
    const [isClickReplay, setIsClickReply] = React.useState(true);
    const [isClickEditBtn, setIsClickEditBtn] = React.useState(true);
    return (
      <div className='leave-message-main'>
        <div className='leave-message-div'>
          <div>
            <div className='d-flex'>
              <div className='message-name'>{props.name ? props.name : '匿名人士'}</div>
              <div className='message-date'>&nbsp;{"在 " + props.Date + ' 發布了這則訊息'}</div>
            </div>
            <div className='message-data'>
              {props.message}
              <div className='d-flex float-right'>
                <Button variant="text" className="message-edit-button"
                        onClick={() => {
                          setIsClickEditBtn(!isClickEditBtn)
                        }}
                >
                  {isClickEditBtn ? '編輯文章' : '取消'}
                </Button>
                <Button variant="text" className="message-delete-button">
                  刪除文章
                </Button>
              </div>
              {!isClickEditBtn ?
                <>
                  <MessageTextArea className='leave-message-text-filed'
                                   content={props.message}/>
                  <Button variant="text" className="message-edit-button margin-left-minus-15">送出</Button>
                </> : ''
              }
            </div>
            {props.leaveMessage.map((item: leaveMessageType) => (
              <LeaveMessage name={item.name} Date={item.Date} message={item.message}/>
            ))}
          </div>
          <Button variant="text" className="message-edit-button margin-left-minus-15"
                  onClick={() => setIsClickReply(!isClickReplay)}>
            {isClickReplay ? '回覆' : '取消'}
          </Button>
          <div>
            {!isClickReplay ?
              <>
                <MessageTextArea className='leave-message-text-filed' placeholder='輸入想說的話'/>
                <Button variant="text" className="message-edit-button margin-left-minus-15">送出</Button>
              </>
              : ''}
          </div>
        </div>
      </div>
    )
  }
  const icon = ['❅', '❆', '✿', '❆', '❅', '❆', '❀', '❆', '❅', '❆', '✿', '❆', '❅', '❆', '❀', '❆']
  return (
    <main>
      <div className='main-bg'>
        <div className='text-filed-div'>
          <h1 className='title-label'>發牢騷留言板</h1>
          <MessageTextArea className='text-filed' placeholder='輸入想說的話'/>
          <Button variant="outlined" className="message-submit-button">送出</Button>
          {fakeData.map((item: messageType, i) => (
            <Message
              name={item.name}
              Date={item.Date}
              message={item.message}
              leaveMessage={item.leaveMessage}
              key={i}/>
          ))}
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