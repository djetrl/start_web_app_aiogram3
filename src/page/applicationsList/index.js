import { Link } from "react-router-dom";
import "./applicationsList.css";
import Application from '../../component/application'

const ApplicationsList = () =>{

    return(
        <div className="ApplicationsList">
            <h2 className="applicationsList_title">На модерации</h2>
            <Application status={"отклонена"}/>
            <Application status={"на модерации"}/>
            <h2 className="applicationsList_title">Активные</h2>
            <Application status={"активная"} responses={{need:2, there: 23}}/>
            <Link to="/form"><button className="btn btn-blue" style={{margin:'0 auto'}}>Создать</button></Link>
        </div>
    )
}

export default ApplicationsList;