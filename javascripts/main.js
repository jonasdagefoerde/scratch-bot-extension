
(function(ext) {

  // TODO: login to receive access token
  var usr_access_token = "de4187afe811a8fa678ba097c2d1efecfcb6f442";
  // TODO: set device id via hat block
  var device_id = "1c0035001247343432313031";

  // Cleanup function when the extension is unloaded
  ext._shutdown = function() {};

  // Status reporting code
  // Use this to report missing hardware, plugin or unsupported browser
  ext._getStatus = function() {
    return {status: 2, msg: 'Ready'};
  };

  // Make an AJAX call to the Particle API
  function particle_api_call(func_name, func_args) {
    console.log(func_name + " started");
    $.ajax({
      type: "POST",
      url: 'https://api.particle.io/v1/devices/' + device_id + '/' + func_name,
      async: true,
      dataType: 'json',
      data: { access_token: usr_access_token, args: func_args },
      success: function() {}
    });
    console.log(func_name + " stopped");

  };
  ext.move_forward = function() { particle_api_call("move", "fwd"); };
  ext.move_backward = function() { particle_api_call("move", "bkw"); };
  ext.move_left = function(duration) { particle_api_call("move", "left"); };
  ext.move_right = function(duration) { particle_api_call("move", "right"); };

  // Block and block menu descriptions
  var descriptor = {
    blocks: [
      // Block type, block name, function name, default param values
      ['', 'move scratch-bot forward', 'move_forward'],
      ['', 'move scratch-bot backward', 'move_backward'],
      ['', 'move scratch-bot left for %s milli seconds', 'move_left', '245'],
      ['', 'move scratch-bot right for %s milli seconds', 'move_right', '245'],
    ]
  };

  // Register the extension
  ScratchExtensions.register('ScratchBot extension', descriptor, ext);

})({});
