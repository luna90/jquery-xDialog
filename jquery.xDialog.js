/*
* @author Luna-li
* @email lunali_blog@163.com
* @version 1.0 
* @des 请尊重作者劳动成果，注明出处来源，如有问题，请发致邮箱！
*/

;(function($){
	
	/* 全局变量 */
	var isIE6 = (!-[1,] && !window.XMLHttpRequest),  //判断IE6 
	    isHave = false;   //判断默认弹出框是否存在
		
	var Dialog = function(options) {
        
        this.settings = $.extend({}, Dialog.defaults, options);
        
        this.init();
        
    }
	
	Dialog.prototype = {
		
		init : function(){
			       
			   this._create();	  
			   
		},
		_create : function(){   /* 创建 */
				This = this;
					
				if(!isHave){  //避免重复创建
				   var createTemp = '<div class="DialogCon"><div class="DialogTit">'+ this.settings.DialogTit +
									'<a href="javascript:;" class="DialogClose">x</a>' +
									'</div><div class="DialogArea">'+ this.settings.DialogCon +
									'</div></div>';
					This.Dia = $('<div>').addClass('xDialog').html(createTemp).prependTo('body');
				   
					This._size();  //大小
					This._pos();  //位置  
					This._event();  //事件
				   
					if(this.settings.isLock){  //锁屏
					   This._lock();
					}
					
					isHave = true;
				}
		},
		_size : function(){  /* 大小 */
		
			var DiaArea = This.Dia.find('.DialogArea'),
				DiaCon = This.Dia.find('.DialogCon');

			DiaArea.css({  //对话框内容层
			   'width'  : this.settings.width,
			   'height' : this.settings.height	
			});
			
			DiaCon.css({  //对话框父级
			   'width'  : DiaArea.outerWidth(),
			   'height' : DiaArea.outerHeight()	
			});
			
			this.DiaCon = DiaCon;
		},
		_pos : function(){  /* 位置 */
			var vW = $(window).width(),
				vH = $(window).height(),
				ST = isIE6 ? $(document).scrollTop() : 0;
			
			this.Dia.css({  //对话框样式
				'left' : (vW - this.DiaCon.outerWidth()) / 2,
				'top' : (vH - this.DiaCon.outerHeight()) / 2 + ST
			});
		},
		_event : function(){  /* 事件 */
			var _this = this,
				DialogClose = This.Dia.find('.DialogClose');
				
			//close
			DialogClose.on('click',function(){
				_this._close();
				isHave = false;
			});
			
			// resize
			$(window).on('resize', function() {
				_this._pos();
			});	
			
			// scroll
			if (isIE6) {
				$(window).on('scroll', function() {
					_this._pos();
				});
			};
		},
		_lock : function(){   /* 锁屏 */
			this.DialogLock = $('<div>').css({ zIndex : 100 }).addClass('DialogMask');
			$('body').append(this.DialogLock); 
			if (isIE6) {
				this.DialogLock.css({ height : $('body').height() });
			}
		},
		_unLock : function() {   /* 解除锁屏 */
			this.DialogLock.remove();
		},
		_close : function(){   /* 关闭 */
			this.Dia.remove();
			if (this.settings.isLock){
			   this._unLock();
			}
		}
		
	};

	/* 默认设置 */
	Dialog.defaults = {
		isLock : false,  //是否显示遮罩层
		width : 'auto',   //宽
		height : 'auto',   //高
		DialogTit : '默认标题',   //默认标题  
		DialogCon : '默认内容'   //默认内容
	};
	
    var xDialog = function(options) {
        new Dialog(options);
    };
    
    window.xDialog = $.xDialog = $.dialog = xDialog;

})(jQuery);