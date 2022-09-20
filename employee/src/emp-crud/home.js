import logo from '../assets/download.png'

const Home = ()=>{
    return(
        <div className="home">
            <h1>Welcome To Employee records Keeper.</h1>
            <h3>Select the required Option through the side menu and perform your desired operations!</h3>
            <div className="logo-img">
               <img src={logo} alt="logo here"/>
            </div>
        </div>
    )
}
export default Home;