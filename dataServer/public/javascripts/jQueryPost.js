$(document).ready(function() {
  $('???').click(function() {
    var payload = {
      url: $('#url').val()
    };

    $.ajax({
      url: "/urls",
      type: "POST",
      contentType: "application/json",
      processData: false,
      data: JSON.stringify(payload),
      complete: function (data) {
          $('#output').html(data.responseText);
      }
    });
  });
});
