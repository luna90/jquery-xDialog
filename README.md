# jquery-xDialog v1.0
xDialog is a jQuery plug to use dialog in pages as a function.
    
include "jquery.xDialog.js" in your page,then you can use like this~
   
as "mouseover":
    
        $('your dialog dom').on('mouseover', function() {
		$.dialog({
			'width'  : 200,
			'height' : 280,
			'DialogTit' : 'your title',
			'DialogCon' : 'your content'
		});
	});
    
as "click":
    
        $('your dialog dom').on('click', function() {
		$.dialog({
			'width'  : 350,
			'height' : 350,
			'isLock' : true
		});
	});
    
    if you have any problem in using,you can send an email to "lunali_blog@163.com".
	
	
