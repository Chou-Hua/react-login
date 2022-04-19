export const Experience = () => {
  const experienceData = [
    {
      date: 'Mar.2021 ~ Now ',
      company: '精誠隨想',
      position: 'FRONTEND DEVELOPER',
      project: [
        {
          projectName: '星宇航空 : 管理者設定 | 客製化航班表格 | 客製化密碼檢核 | 圖片預覽',
          projectContent:
            '採用前端主流三大框架之一Vue 與 Vuex 進行開發，從無到有的開發機場運務處所需的內部後台系統，' +
            '處理商業邏輯，利用Vuex內的State、Action、Mutation進行資料控管，並使用axios來與後端進行溝通，' +
            '客製化航班表格(表格凍結、塞選顯示欄位)，卡片拖拉功能。圖片影片上傳，以及預覽功能，即時更新頁面資訊。',
          skillList: ['Vue', 'Vuex', 'Vxe-table', 'Boostrap-Vue', 'Vue-Draggable', 'Eslint', 'Webpack', 'NPM']
        },
        {
          projectName: '大江生醫司馬驛 : 管理者設定 | 小遊戲後台 | 圖片預覽',
          projectContent:
            '兩周內將從零開始學習js、vue相關知識，並於兩周後投入網頁遊戲後台系統開發，主要處理遊戲畫面設定，例如轉盤圖片顏色更換，' +
            '設定時可以即時看到修改後的樣式，處理中獎名單以及獎品數量種類控管資料，採用Vue 、 TypeScript 、 Vuex 進行開發' +
            '並使用TypeScript來規範資料的型態，使商業邏輯以及資料更加嚴謹化',
          skillList: ['Vue', 'Vuex', 'TypeScript', 'Boostrap-Vue', 'Eslint']
        },
      ]
    },
    {
      date: 'Apr.2019 ~ Feb.2021 ',
      company: '博星數位',
      position: 'AUTOMATION TEST DEVELOPER ',
      project: [
        {
          projectName: '測試分析，撰寫測試案例',
          projectContent: '分析各個專案的測試分析，以及撰寫測試案例，將測試分析以大到小，化繁為簡。利用心智圖，根據每個專案的大功能再下去細分' +
            '每個接口、資料功能的測試案例，利用Mantis進行Bug回報與追蹤。',
          skillList: ['Mantis', 'XMind', 'Excel']
        },
        {
          projectName: '圖片辨識，實現自動化操作網頁功能',
          projectContent: 'Sikulix是一款以java為基底，語法為python的圖像辨識工具之一，' +
            '可以簡易的實現，替畫面上非元素元件，建立元素並給予座標，簡易實現自動點擊、拖拉、所給定的座標位置，但該工具會需要綁定滑鼠，' +
            '因此研究了無須綁定的方法，利用selenium開啟網頁並且使用win32api取得該頁面handleID，可取得當前頁面之畫面，再利用opencv圖像辨識找出該' +
            '元素圖片，利用python在後台控制滑鼠點擊該尋找到的圖片元素位置',
          skillList: ['Sikulix', 'Java', 'Python', 'Win32Api', 'opencv', 'Selenium', 'Numpy']
        },
        {
          projectName: '分析資料，將資料進行可試化',
          projectContent: '分析網頁內的User-Agent記錄著用戶使用什麼作業系統、手機、平板、瀏覽器版本，再將分析後的資料統整，利用Pyecharts' +
            '產出相關資料的可視化圖表，讓團隊內可以更加快速的了解，各種版本的占比。',
          skillList: ['Python', 'Numpy', 'Matplotlib', 'Pyecharts']
        },
        {
          projectName: '編寫自動化小工具，讓團隊壓力減輕',
          projectContent: 'AutoHotKey與python結合，製作出一個GUI小工具用於自動產生設定用的EXCEL文字內容，' +
            '以AutoHotkey為主製作使用頁面，設定相關需要產生EXCEL的參數，再藉由python去執行連接DB撈取相關內容，後續執行python相關設定',
          skillList: ['AutoHotkey', 'Python', 'Pymysql']
        }
      ]
    },

    {
      date: 'Jun.2014 ~ Jun.2018 ',
      company: 'Computer Science and Information Engineering',
      position: '',
      project: [
        {
          projectName: '',
          projectContent: 'MING CHUAN UNIVERSITY 私立銘傳大學',
          skillList: []
        }
      ]
    }
  ]


  type liContentType = {
    date?: String,
    company?: String,
    position?: String,
    project: Array<Object>,
  }

  type projectObjType = {
    projectName?: string;
    projectContent?: string;
    skillList?: any;
  }

  type experienceDataType = {
    date?: string,
    company?: string,
    position?: string,
    project: object[]
  }

  const LiContent = (props: liContentType) => {
    return (
      <div>
        <p className='li-span'>{props.date}</p>
        <div className="content">
          <h3>{props.company}
            <span className='experience-position'>{props.position}</span>
          </h3>
          {props.project.map((item: projectObjType, i) => (
            <div key={i}>
              {item.projectName && <h5>{item.projectName}</h5>}
              <p>{item.projectContent}</p>
              <div className='experience-work-skill-list'>
                {item.skillList.map((item: String, i: number) => (
                  <span className='experience-work-skill-item' key={i}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  return (
    <>
      <div id="experience" className='experience'>
        <div className='experience-title'><h3>Experience</h3></div>
        <div className='experience-main'>
          <div className="timeline">
            <ul className='ul-class'>
              {experienceData.map((item: experienceDataType, i) => (
                <li>
                  <LiContent key={i} date={item.date} company={item.company} position={item.position}
                             project={item.project}/>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}