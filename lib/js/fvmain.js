//fvmain

var fv = {
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
			fv.fvalidate[arr[i]].init(el);
		}
	},
	fvalidate : {
		emailvalidate : {
			init : function(el){
				this.el = el;
				if(!this.config.emailFilter.test(el.val())){
					this.errorHandling();
				}
				 
			},
			config : {
				emailFilter : /^[^@]+@[^@.]+\.[^@]*\w\w$/ , //test email for illegal characters
			},
			message : {
				m:'this is error message (mobile) for email validation',
				d:'this is error message (desktop) for email validation'
			},
			errorHandling : function(){
				var hook = "#"+$(this.el).attr("id");
				$(hook).tooltip({
					title: this.message[client],
					placement:"right"
				})
				$(hook).tooltip('show');
			}
		},
		letterOnly: {
			init : function(el){
				this.el = el;
				console.log(el.val().length, this.config.minimumchar)
				if(!this.config.illegalChars.test(el.val())){
					this.errorHandling();
				}else if(el.val().length < this.config.minimumchar){
					this.errorHandling();
				}
			},
			config : {
				minimumchar : 4,
				illegalChars : /^[a-zA-Z\ \']+$/
				
			},
			message : {
				m:'this is error message (mobile) for letterOnly',
				d:'this is error message (desktop) for letterOnly'
			},
			errorHandling : function(){
				var hook = "#"+$(this.el).attr("id");
				$(hook).tooltip({
					title: this.message[client],
					placement:"right"
				})
				$(hook).tooltip('show');
			}
       }
	}
}
$(document).ready(function(){
	fv.init();
	
})