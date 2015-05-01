// Generated by CoffeeScript 1.8.0
(function() {
  var Server, c, call_function, context, get_column, height, move_view_port, ord, refresh_frames, refresh_image, rotate_view_port, set_column, set_pixel, start_rendering, width;

  c = document.getElementById('mat');

  context = c.getContext('2d');

  width = 500;

  height = 500;

  set_pixel = function(x, y, r, g, b) {
    context.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + 1.0 + ')';
    return context.fillRect(x, y, 1, 1);
  };

  set_column = function(x, data) {
    var column, i, _i, _ref;
    column = context.createImageData(1, height);
    for (i = _i = 0, _ref = data.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      column.data[i] = data[i];
    }
    return context.putImageData(column, x, 0);
  };

  Server = (function() {
    function Server() {
      1;
    }

    Server.prototype.call = function() {
      var function_name, para;
      function_name = arguments[0];
      console.log(arguments);
      para = arguments.slice(1, -1);
      return call_function(function_name, para, arguments[-1]);
    };

    return Server;

  })();

  call_function = function(func_name, data, success) {
    return $.ajax({
      url: func_name,
      data: data,
      dataType: 'json',
      success: success
    });
  };

  get_column = function(x) {
    return call_function('get_column', {
      x: x
    }, function(d) {
      console.log('resturen');
      return set_column(x, d);
    });
  };

  move_view_port = function(x, y, z) {
    return call_function('move_view_port', {
      x: x,
      y: y,
      z: z
    }, function(d) {
      return start_rendering(-5);
    });
  };

  rotate_view_port = function(x, y, z, angle) {
    return call_function('rotate_view_port', {
      x: x,
      y: y,
      z: z,
      angle: angle
    }, function(d) {
      return start_rendering(-5);
    });
  };

  start_rendering = function(sample_rate) {
    return call_function('start_rendering', {
      sample_rate: sample_rate
    }, function() {
      return refresh_image();
    });
  };

  refresh_image = function() {
    var image;
    image = new Image();
    image.src = "current_mat.jpg?rand=" + (Math.floor(1000000 * Math.random()));
    return image.onload = function() {
      return context.drawImage(image, 0, 0);
    };
  };

  ord = function(W) {
    return W.charCodeAt(0);
  };

  $("body").keypress(function(event) {
    var ratio;
    console.log(event.keyCode);
    ratio = 1;
    if (event.shiftKey) {
      ratio = 0.1;
    }
    if (ord('A') <= event.keyCode && event.keyCode <= ord('Z')) {
      event.keyCode += -ord('A') + ord('a');
    }
    if (event.keyCode === 'h'.charCodeAt(0)) {
      move_view_port(-3 * ratio, 0, 0);
    }
    if (event.keyCode === 'l'.charCodeAt(0)) {
      move_view_port(3 * ratio, 0, 0);
    }
    if (event.keyCode === 'j'.charCodeAt(0)) {
      move_view_port(0, -3 * ratio, 0);
    }
    if (event.keyCode === 'k'.charCodeAt(0)) {
      move_view_port(0, 3 * ratio, 0);
    }
    if (event.keyCode === 'u'.charCodeAt(0)) {
      move_view_port(0, 0, -3 * ratio);
    }
    if (event.keyCode === 'm'.charCodeAt(0)) {
      move_view_port(0, 0, 3 * ratio);
    }
    if (event.keyCode === 'a'.charCodeAt(0)) {
      rotate_view_port(0, 1, 0, -Math.PI / 12 * ratio);
    }
    if (event.keyCode === 'd'.charCodeAt(0)) {
      rotate_view_port(0, 1, 0, Math.PI / 12 * ratio);
    }
    if (event.keyCode === 'w'.charCodeAt(0)) {
      rotate_view_port(1, 0, 0, -Math.PI / 12 * ratio);
    }
    if (event.keyCode === 's'.charCodeAt(0)) {
      rotate_view_port(1, 0, 0, Math.PI / 12 * ratio);
    }
    if (event.keyCode === 'r'.charCodeAt(0)) {
      refresh_image();
    }
    if (event.keyCode === 't'.charCodeAt(0)) {
      start_rendering(3);
    }
    if (event.keyCode === '1'.charCodeAt(0)) {
      call_function('add_frame');
    }
    if (event.keyCode === 'r'.charCodeAt(0)) {
      return call_function('render_video');
    }
  });

  $(document).ready(function() {
    $('#execute-button').click(function() {
      console.log($('#code').val());
      return call_function('execute', {
        code: $('#code').val()
      }, function(data) {
        return $('#result').html(data);
      });
    });
    $('#code').keydown(function(event) {
      if (event.keyCode === 13) {
        $('#execute-button').click();
      }
      return event.stopPropagation();
    });
    $('#code').keyup(function(event) {
      return event.stopPropagation();
    });
    return $('#code').keypress(function(event) {
      return event.stopPropagation();
    });
  });

  refresh_frames = function() {
    return call_function('get_frames', {}, function(d) {
      var frame, _i, _len, _results;
      $('#frames').html('');
      _results = [];
      for (_i = 0, _len = d.length; _i < _len; _i++) {
        frame = d[_i];
        _results.push($('#frames').append('<div>' + frame.toString() + '</div>'));
      }
      return _results;
    });
  };

  setInterval(refresh_image, 100);

  setInterval(refresh_frames, 100);

}).call(this);

//# sourceMappingURL=client.js.map