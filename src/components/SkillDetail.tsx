import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BuildIcon from '@mui/icons-material/Build';
import LanguageIcon from '@mui/icons-material/Language';

interface cardsType {
  title: String,
  className: any,
  content: Array<String>
}

const CustomCard = (props: cardsType) => {
  return (
    <Card className='card-div'>
      {props.className}
      <h3 className='card-title-h3'>{props.title}</h3>
      <CardContent>
        <ul className={props.content.length > 8 ? 'ul-dots-remove-8' : 'ul-dots-remove'}>
          {props.content.map((item: String, i) => (
            <li key={i} className='li-test'>{item}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
const cards = [
  {
    icon: <AssignmentIcon className='assignment-icon' sx={{fontSize: 80, color: "rgb(85, 120, 170,0.7)"}}/>,
    title: 'Document Processing',
    list: ['Word', 'PowerPoint', 'Excel'],
  },
  {
    icon: <BuildIcon className="build-icon" sx={{fontSize: 80, color: "rgb(85, 120, 170,0.7)"}}/>,
    title: 'Web Development',
    list: [
      'HTML5',
      'SCSS/CSS',
      'JavaScript',
      'Webpack',
      'Npm ',
      'TypeScript',
      'Bootstrap',
      'Eslint',
      'React & hooks',
      'Recoil',
      'Material UI',
      'Git Version Control',
    ],
  },
  {
    icon: <LanguageIcon className="language-icon" sx={{fontSize: 80}}/>,
    title: 'Language',
    list: ['Chinese', 'Taiwanese', 'English', 'Japan'],
  },
];
export const SkillDetail = () => {
  return (
    <div id="skill_learn" className='skill-learn'>
      <div className='skill-main'>
        {cards.map((card, i) => (
          <CustomCard key={i} title={card.title} className={card.icon} content={card.list}></CustomCard>
        ))}
      </div>
    </div>
  )
}