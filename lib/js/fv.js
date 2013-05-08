M192.form = {
              nameVaildationConfig : function (_self){
                     var validation ={
                        feedBack : $(_self).parent(".inputStyler").next(".errorMsg"),
                        rule:1,
                        errorMsg : "Required", 
                        errorLetterOnly: "Must be letters Only", 
                        errorMin : "Must be at least 2 characters (letters only)"
                     }
                     return validation;
              },
              passWordVaildationConfig : function (_self){
                     var validation ={
                        feedBack : $(_self).parent(".inputStyler").next(".errorMsg"),                    
                        minCount : 4, 
                        errorMin : "The password must be at least 4 characters long.\n",
                        maxCount : 20,
                        errorMax : "The password must be between 4-20 characters long.\n"
                     
                     }
                     return validation;
              },
              emailVaildationConfig : function (_self){
                     var validation ={
                        feedBack : $(_self).parent(".inputStyler").next(".errorMsg"),                    
                        error:"Please enter a valid email address."                
                     }
                     return validation;
              },
              feedBackVaildationConfig : function (_self){
                     var validation ={
                        feedBack : $(_self).parent(".inputStyler").next(".errorMsg"),                    
                        minCount : 20, 
                        errorMin : "Minimum 20 character.\n",
                        maxCount : 2000,
                        errorMax : "Max 2000 character.\n"           
                     }
                     return validation;
              }             

              
}

$(document).ready(function() {
$(':input[value=""]').attr('disabled', false); 
$.extend($.fn,{      
       minRequiredLenght:function(options) {
              console.log("minRequiredLenght:", options)
              if (this[0].value.length === 0) { 
                            //$(this).parent(".inputStyler").next(".errorMsg").next(".errorMsgOther").html(options.errorMsg);
                           options.feedBack.next(".errorMsgOther").html(options.errorMsg); // NOT sure about this call.  
                           options.feedBack.html(options.errorMsg);
                            return 1;   
                     }
                                               
       },
       minTwo:function(options) {
              console.log("minTwo:",options)
              if (this[0].value.length === options.rule) {
                     options.feedBack.html(options.errorMin);
                     this.hideGreenTick(this);
                     return 1;
              }
              
       },
       emptyfield:function (errorMsg) {
              console.log("emptyfield:", errorMsg);
           if (this[0].value.length == 0) {
              $(this).parent(".inputStyler").next(".errorMsg").html(errorMsg);
              this.hideGreenTick(this);
              return 1; 
              }else {
                     $(this).parent(".inputStyler").next(".errorMsg").html("");
                     this.showGreenTick(this);
                     return 0;
              }
    
           },
       emailvalidate:function(options) {
              console.log("emailvalidate:",options);
              var tfld = this.trim(this[0].value); //value of field with whitespace trimmed off
           var emailFilter = /^[^@]+@[^@.]+\.[^@]*\w\w$/ ; //test email for illegal characters  
                  if (!emailFilter.test(tfld)) {                                                       
                      options.feedBack.html(options.error);
                      this.hideGreenTick(this);
                      return 1;
                     }else{
                           options.feedBack.html("");
                           this.showGreenTick(this);
                           return 0;
                    }                           
              },


       trim:function trim(s) {
                     return s.replace(/^\s+|\s+$/, '');
              },
       minLength:function(options) {     
              console.log("minLength:",options);
                     if (this[0].value.length < options.minCount) {  
                              options.feedBack.html(options.errorMin);                                
                                  this.hideGreenTick(this);
                                  return 1;
                                  }else{
                                         options.feedBack.html("");
                                         this.showGreenTick(this);
                                         return 0;            
                                  }             
                           },
       maxLength:function(options) {     
              console.log("maxLength;",options);       
              if (this[0].value.length > options.maxCount) {
                           options.feedBack.html(options.errorMax); 
                           this.hideGreenTick(this);
                           return 1;
                           }
                     },
       letterOnly:function (options) {
              console.log("letterOnly;",options);
              var illegalChars = /^[a-zA-Z\ \']+$/;           
              if (!illegalChars.test(this[0].value)  && this[0].value.length > 1){              
                     options.feedBack.html(options.errorLetterOnly);
                     this.hideGreenTick(this);
                     return 1; 
              }else if(this[0].value.length > 1  ){
                     options.feedBack.html("");
                     this.showGreenTick(this);               
                     return 0;                 
              }
       },
       regFldValidator:function(options) {      
              console.log("regFldValidator;",options);
              var letterOnly = this.letterOnly(options);
              var minReg= this.minRequiredLenght(options);                               
              var minTwoChr = this.minTwo(options);           
              if (minReg === 1 || minTwoChr === 1 || letterOnly === 1) {return 1;}       
       },
       hideGreenTick:function(fld) {            
              $(fld).parent(".inputStyler").next(".errorMsgOther").removeClass("hideItem");                                                                            
              $(fld).parent(".inputStyler").find(".formGreenTick").addClass("hideItem");
              $(fld).parent(".inputStyler").next(".errorMsg").removeClass("hideItem");
       },
       showGreenTick:function (fld) {
              $(fld).parent(".inputStyler").next(".errorMsgOther").addClass("hideItem");
              $(fld).parent(".inputStyler").next(".errorMsg").addClass("hideItem");
              $(fld).parent(".inputStyler").find(".formGreenTick").removeClass("hideItem");            
       },
       reviewScore:function (errorMsg) {
              if (this[0].value === "0" ) {
                     $(".notRated").html(errorMsg);
                     window.location.replace (window.location.pathname+"#reviewsFormHolder");
                     return 1;
                           }else {
                                  
                                  return 0;
                           }             
                                                             
              },
       reviewTextArea:function (option) {
              var wordCount = $(this).val();
              var removeEmptySpace =  wordCount.replace(/\s+/g, '');
              if (removeEmptySpace.length > 0 && removeEmptySpace.length < option.minValue || removeEmptySpace.length >= 0 && removeEmptySpace.length < option.minValue && $(this).hasClass("jsReport_comment")) {
                     $(".textError").html(option.min20);
                     return 1;
              }else if (removeEmptySpace.length > option.maxValue){
                                  $(".textError").html(option.max2000);
                                  return 1;
                           }else {       $(".textError").html("");
                                         return 0;
                                         }
       },
});

       $("#signInForm").submit(function(e) {
              
              var email    = $("#emailValidate").parent(".inputStyler").next(".errorMsg");
              var password = $("#password").parent(".inputStyler").next(".errorMsg");
                           
              var emailCheck             = email.emailvalidate(M192.form.emailVaildationConfig(email));
              var passwordCheck    = password.minLength(M192.form.passWordVaildationConfig(email)); 
           if(emailCheck === 1 || passwordCheck === 1 ){return false;};              
       });
       $("#peopleForm_page").submit(function(e) {      
          var lookingfor = $("#peopleName_input").minRequiredLenght("");
          var location_input= $("#location_input").minRequiredLenght("");
       
           if(lookingfor === 1 && location_input === 1 ){            
              $("#peopleName_input").minRequiredLenght({errorMsg:"At least one search criteria is required."});                     
              return false; }
       });
       $("#businessSearchForm").submit(function(e) {   
              var lookingfor = $("#businessesLookingFor").minRequiredLenght("");
              var location_input= $("#location_input").minRequiredLenght("");      
              $(':input[type="hidden"]').attr('disabled', true); 
              if(lookingfor === 1 && location_input === 1 ){         
                     $("#businessesLookingFor").minRequiredLenght({errorMsg:"At least one search criteria is required."});
                  return false;
              }
              else {
                     $(".errorMsg").html("");
              }
       });
       $("#businessSearchForm #location_input").keyup(function (e){
              var latitudeInput = document.getElementById("latitude");
                     latitudeInput.value="";                  
              var longitudeInput = document.getElementById("longitude");
                     longitudeInput.value="";                 
              var locationAwareInput = document.getElementById("locationAware");
                     locationAwareInput.value=""; 
       });
       $("#registerForm").submit(function(e) {  
          var forename = $("#forename").regFldValidator({errorMsg:"Required"});
          var surname  = $("#surname").regFldValidator({errorMsg:"Required"});                  
          var emailCheck = $("#emailValidate").emailvalidate("Please enter a valid email address.");
          var minpasswordCheck = $("#password").minLength({count:4,error:"The password must be at least 4 characters long.\n"}); 
          var maxPasswordCheck = $("#password").maxLength({count:20, error:"The password must be between 4-20 characters long.\n"});
           if(emailCheck === 1 || minpasswordCheck === 1  || forename === 1 || surname === 1 || maxPasswordCheck === 1){return false;};           
       });
       $("#noresultPageForm").submit(function(e) {     
          var empty = $("#locationInput").emptyfield("Please enter location.\n"); 
           if(empty===1  ){return false;};               
       });
       $("#reminderForm").submit(function(e) {  
          var emailCheck = $("#emailValidate").emailvalidate("Please enter a valid email address.");     
           if(emailCheck === 1 ){return false;};                
       });
       $("#changeEmailForm").submit(function(e) {      
          var emailCheck = $("#emailValidate").emailvalidate("Please enter a valid email address.");     
           if(emailCheck === 1 ){return false;};                
       });
       
       $("#reportAbuse").submit(function(e) {   
                
              var thankYouMessage=" <div id='thankyouMessage' class='businessDetailsPagePadding'><p class='title'>Thank you</p>"+
                                                "<p>The review you have reported will now be removed from the site and evaluated.</p>"+
                                                "<p>If your complaint is upheld, the review will be removed permanently and you'll be notified via email if you are registered and signed into 192.com</P>"+
                                                "<p>If your complaint is rejected, the review will be displayed on the site.</p></div>" +
                                                "<div id='closeReportAbuseButton'><span class='blueButtonBgroundColor cursor' onclick='closeReportAbuseForm()'>Close</span></div>";     
              $("#reportAbuse").addClass("hideItem");
              $(".reportBody").prepend(thankYouMessage);
              return false;
       });
       
       $("#emailValidate").blur(function() {           
              $(this).emailvalidate(M192.form.emailVaildationConfig(this));
       });
       $("#password").blur(function() {                
              $(this).minLength(M192.form.passWordVaildationConfig(this));  
              $(this).maxLength(M192.form.passWordVaildationConfig(this));
       });    
       $("#forename").blur(function() {           
              $(this).regFldValidator(M192.form.nameVaildationConfig(this));
       });
       $("#surname").blur(function() {          
              $(this).regFldValidator(M192.form.nameVaildationConfig(this));
       });
       $("#feedBackMax").blur(function() {             
              $(this).minLength(M192.form.feedBackVaildationConfig(this));            
           $(this).maxLength(M192.form.feedBackVaildationConfig(this));
                                     
       });
       $("#feedBack").submit(function(e) {      
         var email   = $("#emailValidate");
         var feedBack       =  $("#feedBackMax");
         
         var emailCheck = email.emailvalidate(M192.form.emailVaildationConfig(email));
         var feedMin        = feedBack.minLength(M192.form.feedBackVaildationConfig(feedBack));  
         var feedMax        = feedBack.maxLength(M192.form.feedBackVaildationConfig(feedBack));
           if(emailCheck === 1 || feedMax === 1 || feedMin === 1 ){return false;};          
       });
       $("#businessName").blur(function() {
              var jQueryElem=$(this).parent(".inputStyler").next(".errorMsg");
              $(this).minLength({count:1, error:"Please specify a business name.\n",feedBack:jQueryElem});  
       });
       $("#telephoneValidate").blur(function() {
              var jQueryElem=$(this).parent(".inputStyler").next(".errorMsg");
              $(this).minLength({count:8, error:"Please specify the business phone number.\n",feedBack:jQueryElem});  
       });
       
       $("#postCode").blur(function() {
              var jQueryElem=$(this).parent(".inputStyler").next(".errorMsg");
              $(this).minLength({count:6, error:"Please specify a postcode (i.e SW6 2UZ).\n",feedBack:jQueryElem});  
       });

       $("#reportAbuse").submit(function(e) {   
                
              var thankYouMessage=" <div id='thankyouMessage' class='businessDetailsPagePadding'><p class='title'>Thank you</p>"+
                                                "<p>The review you have reported will now be removed from the site and evaluated.</p>"+
                                                "<p>If your complaint is upheld, the review will be removed permanently and you'll be notified via email if you are registered and signed into 192.com</P>"+
                                                "<p>If your complaint is rejected, the review will be displayed on the site.</p></div>" +
                                                "<div id='closeReportAbuseButton'><span class='blueButtonBgroundColor cursor' onclick='closeReportAbuseForm()'>Close</span></div>";     
              $("#reportAbuse").addClass("hideItem");
              $(".reportBody").prepend(thankYouMessage);
              return false;
       });
       
       $(".businessKeyWordInput").blur(function() {
              //$(this).minLength({count:2, error:""});       
              //$(this).minTwo({count:1, error:"Min 2 charater"});
          // $(this).maxLength({count:-1, error:""});
       });
});


//report reviews
$('a.reportReview').click(function() {
       var options = {
                     id:this.id,
                     url: " /business/review/report/",
                     reportReviewPopup: "#reportReviewPopup",
                     reportImagePopup: "#reportImagePopup",
                     reportForm: "#reportForm",
                     jsSendReportReviewBtn: "#jsSendReportReviewBtn",
                     textarea_reportComment: "#reportComment",
                     fmlReportReview: "#fmlReportReview",
                     humanCheckReportX: ".humanCheckReportX",
                     humanCheckReportY: ".humanCheckReportY",
                     humanCheckReportZ: ".humanCheckReportZ",
                     humanCheckReport: ".humanCheckReport",
                     controlReportX: "#controlReportX",
                     controlReportY: "#controlReportY",
                     controlReportZ: "#controlReportZ",
                     hidden: "hidden",
                     reportReview: "#reportReview",
                     jsReport_comment: ".jsReport_comment",
                     jsReport_humanCheck: ".jsReport_humanCheck",
                     jsReport_: ".jsReport_",
                     i_jsReport_: "i.jsReport_",
                     humanCheckNew: "humanCheckNew",
                     error: "error",
                     hcReportX: ".hcReportX",
                     hcReportY: ".hcReportY",
                     hcReportZ: ".hcReportZ",
                     isMobile:true,
                     jsReportReview: ".jsReportReview",
                     errorMsg: "errorMsg",
                     errorMsgClass: ".errorMsg",                            
                     jsSendReportReviewBtn: "#jsSendReportReviewBtn",
                     XYZ: {x:"X",y:"Y",z:"Z"},
                     position: $(this).position()
                     }
       
       reportAbuse(options);
       
       
});

              
function reportAbuse(options){
       $.get(options.url+''+options.id+'/', function(data) {
              $(options.reportReviewPopup).remove();
              $(options.reportImagePopup).remove();
              $(options.reportForm+''+options.id).html(data);
              
              $(".smallTriangle").css("left", (40+options.position.left)+"px");
              M192.addCharacterCount(".currentCount",20,1000);
              
              var reported = false;
              $(options.jsSendReportReviewBtn).click(function(){
                     
                     var comment = $(options.textarea_reportComment).val();
                     var fml = 'x' + $(options.fmlReportReview).val() + 'x';
                     var    control = "";

                     if (!$(options.humanCheckReportX).hasClass(options.hidden)) {
                           control =options.XYZ.x + $(options.controlReportX).val();
                     } else if (!$(options.humanCheckReportY).hasClass(options.hidden)) {
                           control = options.XYZ.y + $(options.controlReportY).val();
                     } else if (!$(options.humanCheckReportZ).hasClass(options.hidden)) {
                           control = options.XYZ.z + $(options.controlReportZ).val();
                     }
                     
                     var dataString = 'comment=' + comment + '&control=' + fml + control;
                     
              
                     $.ajax({
                           type: 'POST',
                           url: options.url+''+options.id+'/',
                           data: dataString,
                           dataType: 'json',
                           success: function(data) {
                                  $(options.reportReview+' i').html('&nbsp;');
                                  $(options.reportReview+" .jsReport_comment").removeClass(options.error);
                                  $(options.reportReview+" .jsReport_humanCheck").removeClass(options.error);

                                  var hasMessages = false;
                                  $(options.jsReportReview + " "+options.errorMsgClass).html("");
                                  for (message in data) {
                                         if (message != 'humanCheckNew')   hasMessages = true;
                                         if(message === 'humanCheck'){
                                                
                                                $(options.reportReview+ " i.jsReport_"+message).addClass(options.errorMsg);
                                                $(options.reportReview + " i.jsReport_" + message).html(data[message]);
                                         }
                                         if(message === 'comment'){                                                         
                                                $(options.jsReportReview + " "+options.errorMsgClass).html(data[message]);
                                         }
                                  }
                                  
                                  

                                  if (data.humanCheckNew) {
                                         var newCheck = data.humanCheckNew.split(" ");
                                         $(options.humanCheckReportX).addClass(options.hidden);
                                         $(options.humanCheckReportY).addClass(options.hidden);
                                         $(options.humanCheckReportZ).addClass(options.hidden);
                                         $(options.fmlReportReview).val(newCheck[1]);
                                         $(options.hcReportX).text(newCheck[2]);
                                         $(options.hcReportY).text(newCheck[3]);
                                         $(options.hcReportZ).text(newCheck[4]);
                                         $('input#controlReportX').val('');
                                         $('input#controlReportY').val('');
                                         $('input#controlReportZ').val('');
                                         $('input.controlReport').val('');
                                         $(options.humanCheckReport + newCheck[0]).removeClass(options.hidden);
                                  }

                                  if(!hasMessages){
                                         reported = true;
                                         
                                         var html=" <div id='thankyouMessage' class='businessDetailsPagePadding'><p class='title'>Thank you</p>"+
                                         "<p>The review you have reported will now be removed from the site and evaluated.</p>"+
                                         "<p>If your complaint is upheld, the review will be removed permanently and you'll be notified via email if you are registered and signed into 192.com</P>"+
                                         "<p>If your complaint is rejected, the review will be displayed on the site.</p></div>" +
                                         "<div id='closeReportAbuseButton'><span class='blueButtonBgroundColor closeThankYou cursor' onclick='reloadPage()'>Close</span>" +
                                         "<span class='smallTriangle smallTriangleTop' style='left: 41px;'></span></div>";     
                                         
                                         $('.reportBody').html(html);
                                  }
                           }
                     });
                     return false;
              });
       });
}

//unable to bind event to element which is been injected to the dom by javascript, helper function 
function reloadPage() {           
       window.location.replace(window.location.pathname);     
}

function removeReportForm(){
       $('#reportReview').remove();
}


$(".reportReview").click(function(){     
       var id = $(this).attr("id");
       var idSetTimeoutAbuseReport = setTimeout(function (){window.location.replace (window.location.pathname+"#"+id)},300);
       
       
});


