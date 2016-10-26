(function(){
	"use strict";
	var app = {
		menuJson : $.ajax("http://192.168.1.40:1337/menu.json"),
		alice : $.ajax("http://192.168.1.40:1337/alice.md"), 
		mark : $.ajax("http://192.168.1.40:1337/example.md"), 
		init:function(){
			app.listener();
		},
		markdone: function(){
			var markdown = $.ajax("http://192.168.1.40:1337/example.md")
			markdown.done(function(){
				$.get("http://192.168.1.40:1337/example.md",function(data){
					var converter = new showdown.Converter();
					var text = data;
					var html = converter.makeHtml(text);
					$("#md").append(html);
				});
			});
		},
		listener : function(){
			app.menuJson.done(function(){
				app.menuDone();
			});
		},
		menuDone : function(){
			app.menuJson.done(function(menuJ){
				for (var i = 0; i < menuJ.menu.length; i++) {
					menuJ[i]

					var pathJson = "http://192.168.1.40:1337"+menuJ.menu[i].path;
					var titleJson = menuJ.menu[i].title;
					$("#menu").append("<span>"+"<a class='mark' data-number="+pathJson+" href='#''>"+titleJson+"</a>"+"</span>");
					app.convert();
				}
			})
		},
		convert : function(){
			$('.mark').click(function(){
				app.data($(this).data('number'));
			});
		},
		data: function(path){
			$.ajax(path, function(){
			}).done(function(response){
				var converter = new showdown.Converter();
				var text = response;
				var html = converter.makeHtml(text);
				$("#md").html(html);		
			});
		},
	};
	$(document).ready(function(){
		app.init();
	});
})();