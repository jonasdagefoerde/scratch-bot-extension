
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

  ext.move_forward = function() {
    // Make an AJAX call to the Particle API
    console.log("move_forward started: https://api.particle.io/v1/devices/" + device_id + "/move_fwd...");
    $.ajax({
      type: "POST",
      url: 'https://api.particle.io/v1/devices/' + device_id + '/move_fwd',
      dataType: 'json',
      data: { access_token: usr_access_token, args: "" },
      success: function() { $("#ajax-result").text("success"); }
    });
    console.log("move_forward stopped.");
  };

  // Block and block menu descriptions
  var descriptor = {
    blocks: [
      // Block type, block name, function name, default param values
      [' ', 'move forward', 'move_forward'],
    ]
  };

  // Register the extension
  ScratchExtensions.register('ScratchBot extension', descriptor, ext);

})({});
