$(document).ready(function() {
  $(function(){
    $('#draggable').draggable();
    $('#droppable').droppable({
      drop: function(event, ui){
        $(this)
          .addClass('dropped')
          .find('p')
          .html('Dropped!!')
      }
    });
  })




  /* syntax highlight editor */
  var editor = ace.edit( "editor" );
  editor.session.setMode( "ace/mode/javascript" );
  editor.setTheme("ace/theme/tomorrow_night_eighties");
});