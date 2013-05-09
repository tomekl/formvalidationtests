//fvmain

var fv = {
	inputOnFocus : function(){
		$('input').focus(function(){
			$(this).tooltip('destroy');
		})
	},
	init : function(){
		$('form').submit(function(e){
			e.preventDefault();
			var _self = $(this);
			var hk = '#'+$(_self).attr('id');
			var allInputs = $(hk+" :input");
			$(allInputs).each(function(i,el){
				if($(el).data().validation != null){
					fv.get_validation_rules($(el).data().validation, $(el))
				}
			})
		})

	},
	get_validation_rules : function(rule, el){
		var arr = rule.split("|");
		for(i=0;i< arr.length; i++){
			fv.fvalidate.current = arr[i];fv.fvalidate[arr[i]].init(el);
			if(i == (arr.length - 1)){
				fv.fvalidate.errorCnt = 0;
			}else{
				fv.fvalidate.errorCnt =+1;
			}
			console.log(fv.fvalidate.errorCnt);
		}
	},
	fvalidate : {
		errorCnt : 0,
		emailvalidate : {
			init : function(el){
				this.el = el;
				if(!this.config.emailFilter.test(el.val())){
					fv.fvalidate.errorHandling(this.el);
				}
				 
			},
			config : {
				emailFilter : /^[^@]+@[^@.]+\.[^@]*\w\w$/ , //test email for illegal characters
			},
			message : {
				m:'error message (mobile) for email validation',
				d:'error message (desktop) for email validation'
			},
		},
		letterOnly: {
			init : function(el){
				this.el = el;
				if(!this.config.illegalChars.test(el.val())){
					fv.fvalidate.errorHandling(this.el);
				}
			},
			config : {
				illegalChars : /^[a-zA-Z\ \']+$/
			},
			message : {
				m:'error message (mobile) for letterOnly',
				d:'error message (desktop) for letterOnly'
			},
		},
		minTwo : {
			init : function(el){
				this.el = el;
				if(el.val().length < this.config.minimumchar){
					fv.fvalidate.errorHandling(this.el);
				}
			},
			config : {
				minimumchar : 5,
			},
			message : {
				m:'error message (mobile) for minTwo',
				d:'error message (desktop) for minTwo'
			},
		},
		errorHandling : function(el){
			var hook = "#"+$(el).attr("id");
			$(hook).tooltip('destroy');
			if(fv.fvalidate.errorCnt > 0){this.err = this.err+"<br/>"+this[fv.fvalidate.current].message[client];
			}else{this.err = this[fv.fvalidate.current].message[client]}
			$(hook).tooltip({html:true,title:this.err,placement:"right"})
			$(hook).tooltip('show');
		}
	}
}
$(document).ready(function(){
	fv.init();
	fv.inputOnFocus();
	
	
})