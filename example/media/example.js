var futon = new djangochair('/todo/list');

$(document).ready(function() {
    $('input:checkbox').live('change', function(){
        var checked = $(this).attr('checked');
        var key = $(this).val();
        futon.get(key, function(r) {
            r.data.fields.completed = checked;
            futon.update(r);
        });
    });
    
    $("#table a").live('click', function(){
        var key = $(this)[0].id.substr(7);
        futon.remove(key);
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
       futon.updated(function(r) {
           futon.remote_save(r);
       });
       futon.deleted(function(r) {
           futon.remote_delete(r, function(r) {
               futon.purge(r.key);
           });
       });
    });

    $("#sync").bind("click", function() {
        $('#table tbody').html("");
        futon.remote_get(add_row);
    });
    
    $("#reset").bind("click", function() {
        $('#table tbody').html("");
        futon.nuke();
        futon.remote_get(add_row);
    });
    
    futon.each(add_row);
})

