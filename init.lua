checkStatus = function()
  if gpio.read(pin) > 0 then
    print("Bathroom is open")
  else
    print("Bathroom is closed")
  end
end

