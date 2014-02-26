$(document).ready(function() {
  $('#form').submit(function() {
    
    // var payload = {
    //   url: $('#url').val()
    // };

    var input = $('#url').val();

    $.ajax({
      url: "/urls",
      type: "POST",
      // contentType: "application/json",
      contentType: "text/plain",
      processData: false,
      // data: JSON.stringify(payload),
      data: input,
      complete: function (data) {
        console.log('Posted!');
      }
    });
  });
});
