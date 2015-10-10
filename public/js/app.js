$('#mc-embedded-subscribe-form').submit(function(e) {
  e.preventDefault();
  var $this = $(this);
  $.ajax({
    type: 'GET',
    url: '//brave.us11.list-manage.com/subscribe/post-json?u=bc970601c83256047af4b8359&id=cb26574db7&c=?',
    data: $this.serialize(),
    dataType    : 'json',
    contentType: 'application/json; charset=utf-8',
    error       : function(err) { alert('Could not connect to the registration server.'); },
    success     : function(data) {
      var container = $('#mailchimp-form');
      var header;
      if (data.result != 'success') {
        header = '<h2>Something went wrong.</h2>';
      } else {
        header = '<h2>Thanks!</h2>';
      }
      container.html(header + data.msg);
    }
  });
  return false;
});