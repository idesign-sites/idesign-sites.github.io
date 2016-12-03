$(document).ready(function() {


$(function(){
  
  var note = $('#note'),
    ts = new Date(2012, 0, 1),
    newYear = true;
  
  if((new Date()) > ts){
    // Задаем точку отсчета для примера. Пусть будет очередной Новый год или дата через 10 дней.
    // Обратите внимание на *1000 в конце - время должно задаваться в миллисекундах
    ts = (new Date()).getTime() + 10*24*60*60*1000;
    newYear = false;
  }
    
  $('#countdown').countdown({
    timestamp : ts,
    callback  : function(days, hours, minutes, seconds){
      
      var message = "";
      
      message += "Дней: " + days +", ";
      message += "часов: " + hours + ", ";
      message += "минут: " + minutes + " и ";
      message += "секунд: " + seconds + " <br />";
      
      if(newYear){
        message += "осталось до Нового года!";
      }
      else {
        message += "осталось до момента через 10 дней!";
      }
      
      note.html(message);
    }
  });
  
});

window.onload = function () {
            var chart = new CanvasJS.Chart("chartContainer", {

              /*title:{
                text:"Текущие ставки за день:",       
                 fontSize: 50,
                 horizontalAlign: "left"
              },*/
              toolTip:{
                     backgroundColor: "#293A44"
               },
                                animationEnabled: true,
              axisX:{
                interval: 1,
                gridThickness: 0,
                labelFontSize: 15,
                labelFontStyle: "normal",
                labelFontWeight: "normal",
                labelFontFamily: "Lucida Sans Unicode"

              },
              axisY2:{
                interlacedColor: "",
                gridColor: "#D5E0E9",
                labelFontSize: 20,

              },

              data: [
              {     
                type: "bar",
                        name: "companies",
                axisYType: "secondary",
                color: "#58C3FF",       
                dataPoints: [
                
                {y: 5, label: "845"  },
                {y: 6, label: "840"  },
                {y: 7, label: "835"  },
                {y: 8, label: "830"  },
                {y: 8, label: "825"  },
                {y: 8, label: "820"  },
                {y: 9, label: "815"  },
                {y: 9, label: "810"  },
                {y: 12, label: "805"  },
                {y: 13, label: "800"  },
                {y: 13, label: "795"  },
                {y: 15, label: "790"  },
                {y: 28, label: "785" },
                {y: 32, label: "780"   },
                {y: 32, label: "775"  },
                {y: 68, label: "770"   },
                {y: 73, label: "765"},
                {y: 100, label: "755" },
                {y: 100, label: "750" },
                {y: 100, label: "745" },        
                {y: 100, label: "740" } ]
              }
              
              ]
            });

            chart.render();
            }


      
      $(".modalbox").fancybox({
        leftRatio : 1,
        topRatio : 0.2,
        'width':300,
        scrolling : 'auto',
       

      });
      });


