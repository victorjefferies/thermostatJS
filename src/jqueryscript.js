
$( document ).ready(function() {

  function getTemperatue(city) {
    var apiObj = $.ajax({
      url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city +'&appid=15cd549322b2bd64a07cf2859513fe89&units=metric',
      success: function() {
        $("#temperature_api").text(apiObj.responseJSON.main.temp)
      }
    })
  }

  getTemperatue('Leeds')
  

  thermostat = new Thermostat()
  $("#temperature").text(thermostat.seeTemp())

  $("#up").click(function() { 
    thermostat.up();
    $("#temperature").text(thermostat.seeTemp())
  })

  $("#down").click(function() { 
    thermostat.down();
    $("#temperature").text(thermostat.seeTemp())
  })

  $("#reset").click(function() { 
    thermostat.reset();
    $("#temperature").text(thermostat.seeTemp())
  })

  $("#control_mode").click(function() { 
    thermostat.togglePowerMode();
    $("#power_saving_mode").text(thermostat._powerMode)
  })

  $("#energy_usage_status").click(function() { 
    $("#energy_status").text(thermostat.energyUsage())
  })
})