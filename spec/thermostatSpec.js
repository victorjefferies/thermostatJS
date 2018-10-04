'use strict';

describe('Thermostat', function() {

  var thermostat;

  beforeEach(function(){
    thermostat = new Thermostat()
  })
  
  describe('seeTemp', function(){
    it('should output temperature as 20 by default', function() {
      expect(thermostat.seeTemp()).toEqual(20)
    })
  })

  describe('seePower_mode', function() {
    it ('should output power mode as on',function() {
      expect(thermostat.seePowerMode()).toEqual("on")
    })
  })

  describe('togglePowerMode', function() {
    it ('should switch power mode to off when on',function() {
      thermostat.togglePowerMode()
      expect(thermostat.seePowerMode()).toEqual("off")
    })
    it ('should switch power mode to on when off',function() {
      thermostat.togglePowerMode()
      thermostat.togglePowerMode()
      expect(thermostat.seePowerMode()).toEqual("on")
    })
  })

  describe('up', function(){
    it('should increase temperature by 1', function() {
      thermostat.up()
      expect(thermostat.seeTemp()).toEqual(21)
    })
    it('should reach a max of 25 when power mode is on', function() {
      thermostat = new Thermostat(thermostat.MAXIMUM_TEMP_ON)
      thermostat.up()
      expect(thermostat.seeTemp()).toEqual(thermostat.MAXIMUM_TEMP_ON)
    })
    it('should reach a max of 32 when power mode is off', function() {
      thermostat = new Thermostat(thermostat.MAXIMUM_TEMP_OFF)
      thermostat.togglePowerMode()
      thermostat.up()
      expect(thermostat.seeTemp()).toEqual(thermostat.MAXIMUM_TEMP_OFF)
    })
  })

  describe('down', function(){
    beforeEach(function(){
      thermostat = new Thermostat()
    })
    it('should increase temperature by 1', function() {
      thermostat.down()
      expect(thermostat.seeTemp()).toEqual(19)
    })
    it('should reach a minimum at 10', function(){
      thermostat = new Thermostat(10)
      thermostat.down()
      expect(thermostat.seeTemp()).toEqual(10)
    })
  })

  describe('reset',function(){
    it('should reset the thermostat', function(){
      thermostat.down()
      thermostat.reset()
      expect(thermostat.seeTemp()).toEqual(20)
    })
  })

  describe('energy usage', function() {
    it('should return low energy for < 18', function() {
       thermostat = new Thermostat(thermostat.MEDIUM_ENERGY_USAGE_LIMIT_LOWER - 1)
       expect(thermostat.energyUsage()).toEqual("low-usage")
    })
    it('should return medium energy for 18 < temp < 25', function(){
      thermostat = new Thermostat(thermostat.MEDIUM_ENERGY_USAGE_LIMIT_LOWER)
       expect(thermostat.energyUsage()).toEqual("medium-usage")
      thermostat = new Thermostat(thermostat.MEDIUM_ENERGY_USAGE_LIMIT_UPPER - 1 )
      expect(thermostat.energyUsage()).toEqual("medium-usage")
    })
    it('should return high energy for temp >= 25', function(){
      thermostat = new Thermostat(thermostat.MEDIUM_ENERGY_USAGE_LIMIT_UPPER)
      expect(thermostat.energyUsage()).toEqual("high-usage")
    })
  })
})