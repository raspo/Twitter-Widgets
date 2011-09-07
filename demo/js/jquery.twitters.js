(function($){
	$.fn.extend({
		
		
		// The most basic Twitter widget
		// Only display the latest public tweet, excluding replies
		// Also parse the links inside the tweet
		MinimalTwitter	: function( username ){
		
			var twitterDiv = $(this);
			$.ajax({
				url			: 'http://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name='+username+'&count=20&exclude_replies=true&callback=?',
				dataType	: "json",
				timeout		: 15000,
				
				success : function(data){
					var text	= data[0].text,
						id		= data[0].id_str;
											
					text = text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url){
									return '<a href="'+url+'" target="_blank">'+url+'</a>'});
					text = text.replace(/@(\w+)/g, function(url){
									return '<a href="http://www.twitter.com/'+url.substring(1)+'" target="_blank">'+url+'</a>'});
					text = text.replace(/#(\w+)/g, function(url){
									return '<a href="http://twitter.com/#!/search?q=%23'+url.substring(1)+'" target="_blank">'+url+'</a>'});
					
					twitterDiv.html(text);
				},
				
				error : function(){
					if( window.console && typeof console.log === 'function' ){
						console.log("There was an error connecting to the Twitter account");
					}
				}
			});
		
		},
	
		// Show one tweet with the "time ago" format
		// timestamp converted using the jquery.timeago plugin:
		// https://github.com/rmm5t/jquery-timeago
		TimeAgoTwitter	: function( username ){
		
			var twitterDiv = $(this);
			$.ajax({
				url			: 'http://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name='+username+'&count=20&exclude_replies=true&callback=?',
				dataType	: "json",
				timeout		: 15000,
				
				success : function(data){
					var time	= data[0].created_at,
						text	= data[0].text,
						id		= data[0].id_str;
						
					time = time.replace(/(\+\S+) (.*)/, '$2');
					time = $.timeago( new Date( Date.parse( time ) ) );
											
					text = text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url){
									return '<a href="'+url+'" target="_blank">'+url+'</a>'});
					text = text.replace(/@(\w+)/g, function(url){
									return '<a href="http://www.twitter.com/'+url.substring(1)+'" target="_blank">'+url+'</a>'});
					text = text.replace(/#(\w+)/g, function(url){
									return '<a href="http://twitter.com/#!/search?q=%23'+url.substring(1)+'" target="_blank">'+url+'</a>'});
					text = "<a href='http://twitter.com/"+username+"/status/"+id+"' class='status'>" +time+ "</a> " + text;
					twitterDiv.html(text);
				},
				
				error : function(){
					if( window.console && typeof console.log === 'function' ){
						console.log("There was an error connecting to the Twitter account");
					}
				}
			});
		
		}
	
	});
})(jQuery);