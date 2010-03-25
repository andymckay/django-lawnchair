var djangochair = function(url) {
	this.init(url);
}

djangochair.prototype = {
    init: function(url) {
	    this.django = new Lawnchair('django');
	    this.url = url;
	},
	get: function(key, callback) { this.django.get(key, callback) },
	purge: function(key, callback) { this.django.remove(key, callback); },
	nuke: function(callback) { this.django.nuke(callback); return this },	
    remove: function(key, callback) {
        var that = this; 
	    this.django.get(key, function(r) {
            that.django.save({'key':r.key, 'data':r.data, 'state':"deleted"}, callback);	    
        });
    },
    key: function(obj) {
        var key = obj.pk + '.' + obj.model;
        return key;
    },
	create: function(obj, callback) {
        this.django.save({'key':this.key(obj), 'data':obj, 'state':'created'}, callback);
	},
	update: function(obj, callback) {
	    obj.state = "updated";
        this.django.save(obj, callback);
	},
    find: function(condition, callback) { this.django.find(condition, callback) },
    
	created: function(callback) { this.django.find('r.state == "created"', callback); },
	updated: function(callback) { this.django.find('r.state == "updated"', callback); },
	deleted: function(callback) { this.django.find('r.state == "deleted"', callback); },
	synced: function(callback) { this.django.find('r.state == "synced"', callback); },		
	each: function(callback) { this.django.each(callback)},
	
	remote_get: function(callback) {
	    var that = this;
	    var url = this.url + '/get/';
	    $.getJSON(url, function(records) {
            $(records).each(function(count) {
                var record = records[count];
                var key = that.key(record);
                that.django.get(key, function(exists) {
                    if (exists) {
                        that.django.save({'key':key, 'data':record, 'state':'synced'}, callback);
                    } else {
                        that.create(record, callback);
                    };
                })
            })
        });
	},	
	remote_delete: function(obj, callback) {
	    var url = this.url + '/delete/';	    
	    $.ajax({ 
	        type: 'POST', url: url, success: callback,
	        data: {
	            "key": obj.data.pk, 
	        },
	    })
	},
	remote_save: function(obj, callback) {
	    var url = this.url + '/save/';
	    $.ajax({ 
	        type: 'POST', url: url, success: callback,
	        data: {
	            "key": obj.data.pk, 
	            "data": this.django.adaptor.serialize(obj.data.fields) 
	        },
	    })
	    obj.state = "synced";
	    this.django.save(obj);
	}
}
