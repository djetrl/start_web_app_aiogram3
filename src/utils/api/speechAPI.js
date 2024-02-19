import axios from '../../core/axios';

export default{
    // create: (data)=>axios.post('/api/bot/speech/create', JSON.stringify(
    //     {
    //         audience_level: [
    //           data.AudienceLevel
    //         ],
    //         company_or_industry: data.company_or_industry,
    //         description: data.descr,
    //         discipline_name: data.discipline[0],
    //         industry: data.company_or_industry,
    //         location: data.location,
    //         modul: data.module ? "-": data.module,
    //         performance_date: data.performanceDate,
    //         response_deadline: data.deadline,
    //         short_title: `выступление ${data.program}`,
    //         speech_focus: data.topicOfRequests,
    //         speech_format: data.formOfSpeech,
    //         title: data.program
          
    // }), {
    //   headers:{
    //     "Accept": "application/json",
    //     "Access-Control-Allow-Origin": "*",
        
    //   }
    // })
    create: (data)=>fetch('http://localhost:8000/api/bot/speech/create', {
        method:'POST',
        body:JSON.stringify(
          {
              audience_level: [
                data.AudienceLevel
              ],
              company_or_industry: data.company_or_industry,
              description: data.descr,
              discipline_name: data.discipline[0],
              industry: data.company_or_industry,
              location: data.location,
              modul: data.module ? "-": data.module,
              performance_date: data.performanceDate,
              response_deadline: data.deadline,
              short_title: `выступление ${data.program}`,
              speech_focus: data.topicOfRequests,
              speech_format: data.formOfSpeech,
              title: data.program
            
      }),
      mode:'no-cors'
      })
    
}