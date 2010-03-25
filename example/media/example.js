var todos = new djangochair('/todo/list');

$(document).ready(function() {
    $('input:checkbox').live('change', function(){
        var checked = $(this).attr('checked');
        var key = $(this).val();
        todos.get(key, function(r) {
            r.data.fields.completed = checked;
            todos.update(r);
        });
    });
    
    $("#table a").live('click', function(){
        var key = $(this)[0].id.substr(7);
        todos.remove(key);
        return false;
    });

    function add_row(r) {
        var key = r.key;
        var field = '<input type="checkbox" value="' + key + '"';
        if (r.data.fields.completed) {
            field += ' checked="checked"'
        };
        field += '/>';
        $('#table tbody').append('<tr id="row.' + key + '"><td>' + 
            r.data.fields.text + '</td><td>' +  
            field + '</td><td><a href="" id="delete.' + key + '">del</a></tr>');  
    }

    $("#save").bind("click", function() {
       todos.updated(function(r) {
           todos.remote_save(r);
       });
       todos.deleted(function(r) {
           todos.remote_delete(r, function(r) {
               todos.purge(r.key);
           });
       });
    });

    $("#sync").bind("click", function() {
        $('#table tbody').html("");
        todos.remote_get(add_row);
    });
    
    $("#reset").bind("click", function() {
        $('#table tbody').html("");
        todos.nuke();
        todos.remote_get(add_row);
    });
    
    todos.each(add_row);
})

