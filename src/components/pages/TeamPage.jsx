import './team-page.css';
import teamList from './teamphoto.jpg';
import teamList1 from './teamphoto768.jpg';

const TeamPage = () => {
    return (
      <div>
        <img 
          src={teamList} 
          alt="team" 
          className="team-page__photo"
       />

        <img 
          src={teamList1}  
          alt="team" 
          className="team-page__photo1"
       />
      </div>

      
    );
  };

export default TeamPage;
