import classNames from "classnames";
import { formatDistance, isToday, format } from 'date-fns';
import { ru } from 'date-fns/locale';

import "./application.css";

const Application= ({status, responses = null, }) =>{
    const onTimeLeft = (deadline)=>{
        const toDay = new Date();
        const targetDeadline= new Date(deadline);
        if(targetDeadline > toDay){
            const formattedDate = formatDistance(targetDeadline,toDay, {  locale: ru });
            return `Осталось ${formattedDate} до дедлайна`
        }else if(isToday(new Date(targetDeadline))){
            return 'Дедлайн сегодня'
        }else{
            const formattedDate = formatDistance(targetDeadline,toDay, {locale: ru });
            return `Дедлайн прошел ${formattedDate} назад`
        }
    }

    const onFormatedDate = (date) =>{
        const startDate = new Date(date);
        const endDate = new Date(date).setMilliseconds(2 * 60 * 60 * 1000);

        const formattedStartDate = format(startDate, 'dd MMMM yyyy / HH:mm', { locale: ru });
        const formattedEndDate = format(endDate, 'HH:mm', { locale: ru });

        const formattedDateTimeRange = `${formattedStartDate} - ${formattedEndDate}`;

        return formattedDateTimeRange
    }

    return(
                <div className={classNames("applications", {'applications-rejected':status === 'отклонена'})}>
                    <div className="applications_group">
                        <h3 className="applications_title">CDTO-25</h3>
                        <p className="applications_subtitle">{onFormatedDate('2024-02-19T10:09:01.756Z')}</p>
                    </div>
                    <div className="applications_group">
                        <div className="applications_item">
                         <p className="applications_graytext  applications_subtitle"> аудитория: <span>талантливые управленцы</span></p>
                         <p className="applications_graytext applications_subtitle">индустрия/компания:  <span>-</span></p> 
                        </div>
                        <div className="applications_item">
                            <strong className="applications_subtitle"><span>Менеджмент</span></strong>
                            <span className="applications_subtitle">выступление про проектное управление</span>
                        </div>

                    </div>
                    <div className="applications_group">
                        <p className="applications_subtitle">оффлайн, Кампус Сколково</p>
                        <p className="applications_subtitle">{onTimeLeft('2024-02-19' )}</p>

                    </div>
                    {responses ? (
                        <span className="applications_status applications_status-responses">
                             Отклики <span>{responses.there}</span> / <span>{responses.need}</span>
                        </span>
                    ):(
                        <span className="applications_status">{status}</span>
                    )}
                    {
                        status === 'отклонена' ? (
                            <div className="applications_container_btn">
                                <button className="btn btn-blue">пересоздать</button>
                                <button className="btn btn-transparent">Убрать в архив</button>
                             </div>
                        ):(
                            <div className="applications_container_btn">
                                <button className="btn btn-blue">редактировать</button>
                                <button className="btn btn-darkPink">удалить</button>
                            </div>
                        )
                    }
                </div>
                
    )
}

export default Application;