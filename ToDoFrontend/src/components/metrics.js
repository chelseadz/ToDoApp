import React from 'react';

function Metrics({ todos, setterPages, pageSize}) {

  var averageAll = 0, averageLow= 0, averageMed=0, averageHigh=0, i=0, j=0,k=0;
  var total = 0;
  const calcTime = (fecha1, fecha2) =>{
    const date1 = new Date(fecha1);
    const date2 = new Date(fecha2);

    const diferenciaMilisegundos = date2 - date1;

    // const diferenciaDias = diferenciaMilisegundos / (1000 * 60 * 60 * 24);
    // const diferenciaHoras = diferenciaMilisegundos / (1000 * 60 * 60);
    const diferenciaMinutos = diferenciaMilisegundos / (1000 * 60);

    return diferenciaMinutos;
  }

  const formatMinutes = (minutes) => {
    var seg = parseFloat("0." + (minutes+"").split(".")[1]) * 60
    if (seg <10){
      return Math.floor(minutes)+":0"+Math.floor(seg)
    }else{
      return Math.floor(minutes)+":"+Math.floor(seg)
    }
  }

  for(const idx in todos){
    total = total+1;
    if(todos[idx].doneDate != null){
      if(todos[idx].priority === "HIGH"){
        averageHigh += calcTime(todos[idx].creationDate, todos[idx].doneDate)
        i+=1
      }

      if(todos[idx].priority === "MEDIUM"){
        averageMed += calcTime(todos[idx].creationDate, todos[idx].doneDate)
        j+=1
      }

      if(todos[idx].priority === "LOW"){
        averageLow += calcTime(todos[idx].creationDate, todos[idx].doneDate)
        k+=1
      }
      averageAll+=calcTime(todos[idx].creationDate, todos[idx].doneDate)
    }
  }
  
  setterPages(Math.ceil(total/pageSize));

  return (
    <div class="average-time-container">
    <div class="average-time-section">
        <p>Average time to finish tasks:</p>
        <strong> {formatMinutes(averageAll/(i+j+k))} minutes</strong>
    </div>
    <div class="priority-time-section">
        <p>Average time to finish tasks by priority:</p>
        <ul>
            <li>Low: {k>0 ? formatMinutes(averageLow/k) : 0} mins</li>
            <li>Medium: {j>0 ? formatMinutes(averageMed/j) : 0} mins</li>
            <li>High: {i>0 ? formatMinutes(averageHigh/i) : 0} mins</li>
        </ul>
    </div>
</div>
  );
}

export default Metrics;
