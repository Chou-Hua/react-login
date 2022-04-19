import userImage from '../assets/user-image.jpg'
import GitHubIcon from '@mui/icons-material/GitHub';
import Tooltip from '@mui/material/Tooltip';
import { SkillDetail } from "./SkillDetail";
import { Link } from "react-scroll";
import Button from "@mui/material/Button";
import { Experience } from "./Experience";

const AboutMe = () => {
  const openGithub = () => {
    window.open('https://github.com/Chou-Hua?tab=repositories')
  }
  const openCakeResume = () => {
    window.open('https://www.cakeresume.com/w8633460')
  }
  return (
    <div className='about-me-main'>
      <header className='about-me-header'>
        <div className='hd-div'>
          <h1 className='hd-h1'>
              <span className='hd-hello'>
                HELLO I'M
              </span>
            <span className='hd-name'>
                CHOU HUA
              </span>
          </h1>
        </div>
      </header>
      <div className='about-title'>
        <h2 className='title-style'>
          About Me
        </h2>
      </div>
      <div className='about-me-class'>
        <div className="about-me-photo">
          <div className='photo-main'>
            <img className='user-image' src={userImage} width={300} height={300} alt="Avatar"/>
          </div>
          <div>
          </div>
          <div className='icon-list'>
            <Tooltip title="Github" onClick={openGithub}>
              <GitHubIcon fontSize="large" className="github-icon"/>
            </Tooltip>
            <Tooltip title="CakeResume" onClick={openCakeResume}>
              <div className='cake-resume-icon'>
                CV
              </div>
            </Tooltip>
          </div>
        </div>
        <div className='about-me-context'>
          <div>
            <h3 className='about-me-context-title'>
              轉換跑道，學習新技能
              <span className='about-me-context-text'>
                1 years+ Frontend Developer & 1 years+ Automation Test Developer
              </span>
              <p className='about-me-p'>
                一年內協助團隊開發5個以上的自動化測試工具，並且投入到回歸測試中，並將團隊內非資訊人員，教導至可以單獨開發簡易自動化測試工具，在教導別人的過程中，在教導別人的過程中，也能清楚了解到自己對於這方面的知識是否熟悉。面對陌生的領域，也能快速學習上手。
              </p>
              <p className='about-me-p'>
                藉由網頁測試的經驗，我迅速的學習前端網頁框架，兩周內將從零開始學習js、vue相關知識，並於兩周後投入網頁遊戲後台系統開發，主要負責遊戲設定的畫面。並於半年後，參加大型專案並為開發核心部分。
              </p>
              <p className='about-me-p'>
                利用閒暇的時間來學習 React hooks、以及React基礎觀念，規劃學習TypeScript，樂於與同事一起研究分享新技術保持學習動力、訂閱技術文章，期許自己能成為具有選擇技術能力、工具
                掌握度高的開發人員。
              </p>
            </h3>
          </div>
          <div className='skill-div'>SCSS | Vue | Vuex | JavaScript | React | Recoil | TypeScript</div>
          <div className='skill-div'>Python | JAVA | XMind | SonarQube | Mantis</div>
          <div className='button-list'>
            <Button variant="contained" className="buttons">
              <Link to='skill_learn' spy={true} smooth={true} duration={500}>
                What I learn
              </Link>
            </Button>
            <div className="experience-button">
            <Button variant="contained" >
              <Link to='experience' spy={true} smooth={true} duration={500}>
                Experience
              </Link>
            </Button>
            </div>
          </div>
        </div>
      </div>
      <SkillDetail/>
      <Experience/>
    </div>

  )
}

export default AboutMe;