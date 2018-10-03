function Thermostat(default_temp = 20) {
  this._temp = default_temp
  this.MINIMUM_TEMP = 10
  this.MAXIMUM_TEMP_ON = 25
  this.MAXIMUM_TEMP_OFF = 32
  this.MEDIUM_ENERGY_USAGE_LIMIT_LOWER = 18;
  this.MEDIUM_ENERGY_USAGE_LIMIT_UPPER = 25;
  this._powerMode = "on"
}

Thermostat.prototype.seeTemp = function() {
  return this._temp
}

Thermostat.prototype.up = function() {
  if (this._powerMode == "on" && this._temp == this.MAXIMUM_TEMP_ON) {return null}
  else if (this._powerMode == "off" && this._temp == this.MAXIMUM_TEMP_OFF) { return null}
  else { this._temp += 1 }
}

Thermostat.prototype.down = function() {
  if (this._temp == this.MINIMUM_TEMP) {return null}
  else { this._temp -= 1 } 
}

Thermostat.prototype.seePowerMode = function() {
  return this._powerMode
}

Thermostat.prototype.togglePowerMode = function() {
  this._powerMode = (this._powerMode == "on") ? "off" : "on"
}

Thermostat.prototype.reset = function() {
  this._temp = 20
}

Thermostat.prototype.energyUsage = function() {
  if (this._temp < this.MEDIUM_ENERGY_USAGE_LIMIT_LOWER) {
    return "low-usage"
  }
  else if (this.MEDIUM_ENERGY_USAGE_LIMIT_LOWER <= this._temp && this._temp < this.MEDIUM_ENERGY_USAGE_LIMIT_UPPER) {
    return "medium-usage"
  }
  else {
    return "high-usage"
  }
}

