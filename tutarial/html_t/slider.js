
        $("#nav > li > div").click(function(){
          if(false == $(this).next().is(':visible')) 
            { $('#nav ul').slideUp(280);}
          
          $(this).next().slideToggle(280); 
        });
          $('#nav ul:eq(0)').show();
