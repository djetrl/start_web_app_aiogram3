import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import speechAPI from '../../utils/api/speechAPI'
import classNames from "classnames";
import * as Yup from 'yup';
import Select from "react-select";
import './applicationform.css';
const ApplicationForm = () =>{
    const [location, setLocation] = useState();
    const [disciplineSelect, setDisciplineSelect] = useState();
    const [formOfSpeechSelect, setFormOfSpeechSelect] = useState();
     const navigate = useNavigate();
    const options = [
        { label: "Менеджмент", value: "Менеджмент" },
        { label: "Менеджмент 1 ", value: "Менеджмент 1" },
        { label: "Менеджмент 2", value: "Менеджмент 2", disabled: true },
      ];
    const SignupSchema = Yup.object().shape({
        program: Yup.string().required(),
        module: Yup.string().required(),
        discipline:Yup.array().min(1),
        topicOfRequests:Yup.string().required(),
        AudienceLevel:Yup.string().required(),
        company_or_industry:Yup.string().required(),
        performanceDate:Yup.date(),
        deadline:Yup.date(),
        formOfSpeech:Yup.string().required()
      });
    const formik = useFormik({
        initialValues: {
          program: '',
          module: '',
          discipline:[],
          topicOfRequests:'',
          AudienceLevel:'',
          company_or_industry:'',
          performanceDate:'',
          deadline:'',
          formOfSpeech:'',
          location:'',
          descr:''
        },
        validationSchema:SignupSchema,
        onSubmit: values => {
            speechAPI.create(values).then((data)=>{
                console.log(data);
                toast.success("Заявка добавлена");
                
            }).catch((err)=>{
                console.log(err);
                toast.error("Упс! Мы столкнулись с некоторыми проблемами")
            })

        },
      });
    return(
       <form  className="applicationForm" onSubmit={formik.handleSubmit}> 
            <h1 className="applicationFor_title">Заявка на эксперта</h1>
            <div className="applicationForm_group_container">
                <div className="applicationForm_group">
                    <div className={classNames('applicationForm_item',{'applicationForm_item-error':formik.errors.program })}>
                        <label className="request_item">Программа</label>
                        <input 
                            name="program"
                            onChange={formik.handleChange}
                            value={formik.values.program}
                            type="text"/>
                    </div>
                    <div className={classNames('applicationForm_item',{'applicationForm_item-error':formik.errors.discipline})}>
                        <label className="request_item">Дисциплина</label>
                    <Select 
                        className="request_not"
                        name="discipline"
                        id="discipline"
                        placeholder=""
                        isMulti
                        value={disciplineSelect}
                        onBlur={formik.handleBlur}
                        onChange={selectedOption => {
                            let event = {target: { name: 'discipline', value: selectedOption.map(item=>item.value)}}
                            formik.handleChange(event)
                            setDisciplineSelect(selectedOption)
                        }}
                        options={options}
                        />
                    
                    </div>
                    <div className={classNames('applicationForm_item',{'applicationForm_item-error':formik.errors.AudienceLevel})}>
                        <label className="request_item">Уровень аудитории</label>
                        <input 
                            name="AudienceLevel"
                            onChange={formik.handleChange}
                            value={formik.values.AudienceLevel}
                            type="text"/>
                    </div>
                    <div className="applicationForm_item">
                        <label>Дата выступления</label>
                        <input 
                                name="performanceDate"
                                onChange={formik.handleChange}
                                value={formik.values.performanceDate}                               
                                type="datetime-local"/>
                    </div>
                    <div className={classNames('applicationForm_item',{'applicationForm_item-error':formik.errors.formOfSpeech})}>
                    <Select 
                        name="formOfSpeech"
                        id="formOfSpeech"
                        placeholder="Формат выступления"
                        value={formOfSpeechSelect}
                        onChange={selectedOption => {
                            console.log(selectedOption);
                            let event = {target: { name: 'formOfSpeech', value: selectedOption.value}}
                            setFormOfSpeechSelect(selectedOption)
                            formik.handleChange(event)
                        }}
                        options={[
                                { label: "Пункт 2", value: "Пункт 2" },
                              ]}
                     />
                    </div>
                </div>
                <div className="applicationForm_group">
                    <div className={classNames('applicationForm_item',{'applicationForm_item-error':formik.errors.module})}>
                        <label className="request_item" >Модуль</label>
                        <input 
                            name="module"
                            onChange={formik.handleChange}
                            value={formik.values.module}                        
                            type="text"/>
                    </div>
                    <div className={classNames('applicationForm_item',{'applicationForm_item-error':formik.errors.topicOfRequests})}>
                        <label className="request_item">Тематика запроса / фокус выступления</label>
                        <input                             
                            name="topicOfRequests"
                            onChange={formik.handleChange}
                            value={formik.values.topicOfRequests}   
                            type="text"/>
                    </div>
                    <div className={classNames('applicationForm_item',{'applicationForm_item-error':formik.errors.company_or_industry})}>
                        <label className="request_item">Индустрия/компания</label>
                        <input 
                            name="company_or_industry"
                            onChange={formik.handleChange}
                            value={formik.values.company_or_industry}   
                            type="text"/>
                    </div>
                    <div className="applicationForm_item">
                        <label>Дедлайн отклика</label>
                        <input 
                            name="deadline"
                            onChange={formik.handleChange}
                            value={formik.values.deadline}   
                            type="date"/>
                    </div>
                    <div className="applicationForm_item">
                        <label>Локация</label>
                        <div className="applicationForm_container_radioInput">
                            <input type="radio" id="location" name="location" value='Кампус СКОЛКОВО'  onChange={formik.handleChange} /> 
                            <label htmlFor="location" className="applicationForm_radioInput_label">Кампус СКОЛКОВО</label>
                        </div>
                        <div className="applicationForm_container_radioInput">
                            <input type="radio" id="location" name="location" value={location} onChange={formik.handleChange} />
                            <label htmlFor="location" className="applicationForm_radioInput_label">
                                <input type="text" placeholder="Иное" onChange={e=>{
                                    setLocation(e.target.value)
                                    formik.values.location = e.target.value;
                                }}/>
                            </label>
                        </div>

                    </div>
                </div>
            </div>
            <div className="applicationForm_container_textarea">
                <textarea 
                 className="applicationForm_textarea"
                 placeholder="Подробное описание" 
                 name="descr"
                 maxLength={500} 
                 onChange={formik.handleChange}
                 value={formik.values.descr}
                />
                <span className="applicationForm_textArea_counter">{formik.values.descr.length}/500</span>
            </div>
            <div className="applicationForm-btn-container">
                <button className="btn btn-darkPink" onClick={()=>navigate('/')}>отменить</button>
                <button className="btn btn-blue">отправить на модерацию</button>
            </div>
       </form >
    )
}


export default ApplicationForm;