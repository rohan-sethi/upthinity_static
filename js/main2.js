
(function ($) {
    var isProd = true;    
    var prefix = "";
    var replaceHost = "";
    var replaceValue ="127.0.0.1";
    if(isProd){
    prefix = "http://ec2-3-17-163-235.us-east-2.compute.amazonaws.com:3000";
    replaceHost ="ec2-3-17-163-235.us-east-2.compute.amazonaws.com";
    }
    else{
    prefix="http://localhost:3000";
    replaceHost ="localhost";
    }


    $('.validate-form').on('submit',function(e){
        var check = true;
        e.preventDefault();

        return true;
    });

 
  
    $('.swap').on('click',function(){
        window.location.href = prefix+"/static/contact/swap.html";
    })



 $('.swapmoney').on('click',function(){

    let address = $('.useraddress').val();
    let amt = $('.useramount').val();
    let sec = $('.usersecret').val();
    

    if($('.isUPZ').prop('checked')){

     
        var req = $.ajax({
            url: prefix + "/exchange/registerConvertAmount",
            type: 'POST',
            crossDomain: true,
            data: JSON.stringify({ "sec": sec,"stellarAddress":address,"UPZAmount":amt}),
            contentType: 'application/json',
            dataType: 'json',
        });
        
        req.done(function (data) {
            console.log("In Queue : "+data.waiting_no)
           alert("In Queue : "+data.waiting_no)  
   
        });
        
        req.fail(function (jqXHR, textStatus) {
            alert('fail')
            console.log(textStatus)
            console.log(jqXHR);    
        });

    }

    else
{
     
        var req2 = $.ajax({
            url: prefix + "/exchange/registerConvertAmountXLM",
            type: 'POST',
            crossDomain: true,
            data: JSON.stringify({ "secret": sec,"upthinityAddress":address,"XLMAmount":amt}),
            contentType: 'application/json',
            dataType: 'json',
        });
        
        req2.done(function (data) {
            console.log("In Queue : "+data.waiting_no)
            alert("In Queue : "+data.waiting_no)  
   
        });
        
        req2.fail(function (jqXHR, textStatus) {
            alert('fail')
            console.log(textStatus)
            console.log(jqXHR);    
        });

    }


  

 })



 $('.flood').on('click',function(){

    var reqf = $.ajax({
        url: prefix + "/users/transferPayments",
        type: 'POST',
        crossDomain: true,
        data: JSON.stringify({ }),
        contentType: 'application/json',
        dataType: 'json',
    });
    
    reqf.done(function (data) {
        console.log("done")
       alert("done")  

    });
    
    reqf.fail(function (jqXHR, textStatus) {
        alert('done')
        console.log(textStatus)
        console.log(jqXHR);    
    });

 })


 $('.history').on('click',function(){

    let address = prompt("Please enter address", "");
    if(address == null)
    return;

    window.location.href = prefix.toString().replace("3000","8000")+"/accounts/"+address+"/operations?order=desc&limit=100";

 })



})(jQuery);