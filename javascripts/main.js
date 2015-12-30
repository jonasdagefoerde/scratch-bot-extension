
(function(ext) {
  // TODO: login to receive access token
  var access_token = "de4187afe811a8fa678ba097c2d1efecfcb6f442";
  // TODO: set device id via hat block
  var device_id = "1c0035001247343432313031";

  // Cleanup function when the extension is unloaded
  ext._shutdown = function() {};

  // Status reporting code
  // Use this to report missing hardware, plugin or unsupported browser
  ext._getStatus = function() {
    return {status: 2, msg: 'Ready'};
  };

  ext.move_forward = function(location, callback) {
    // Make an AJAX call to the Open Weather Maps API
    Console.log("get_temp started...");
    $.ajax({
      url: 'https://api.particle.io/v1/devices/' + device_id + '/move_fwd ' +
        '-H "Authorization: Bearer ' + access_token + '"' +
        '-d arg=""',
      dataType: 'jsonp',
      success: function( func_response ) {
        // Got the data - parse it and return the function's return value
        return_value = func_response['return_value'];
        callback(return_value);
      }
    });
  };

  // Block and block menu descriptions
  var descriptor = {
    blocks: [
      // Block type, block name, function name, default param values
      ['w', 'move forward', 'move_forward', ''],
    ]
  };

  // Register the extension
  ScratchExtensions.register('ScratchBot extension', descriptor, ext);

})({});
