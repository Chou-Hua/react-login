
interface iconType {
  icon: String,

}

const Main = () => {
  const Flake = (props:iconType)=>{
    return(
      <div className='snowflake'>{props.icon}</div>
    )
  }
  const icon = ['❅','❆','✿','❆','❅','❆','❀','❆','❅','❆','✿','❆','❅','❆','❀','❆']
    return (
        <div className='main-bg'>
          {icon.map((item,i)=>(
            <Flake icon={item}/>
            ))}
        </div>


    )
}

export default Main;