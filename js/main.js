
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


    if($('.selection-2').val() == 'Delegate'){
        $('.dname').show();
        $('.dshare').show();
     }
     else{
         $('.dname').hide();
         $('.dshare').hide();
     }


    if (localStorage.getItem("pub") !== null) {
        $('.uaddress').html('<span class="show">Address: </span>'+'<span class="showAdd">'+localStorage.getItem("pub")+'</span>');
        if(localStorage.getItem("escrow") !== null){
        $('.uaddress').append('<span class="show">Escrow: </span>'+'<span class="showAdd">'+localStorage.getItem("escrow")+'</span>')
      }
    }

     let posturi = "/users/balance";


     function getDelData(isSec){
     //     alert(isSec)
        if(location.href.toString().includes("member")||location.href.toString().includes("vote"))return;
        
        let skey = $('.loginsecret').val();
   ///     alert(isSec)
        let sendData ="";
        if(location.href.toString().includes("delegate")||skey.length > 30){
        
             sendData = JSON.stringify({ "sec": localStorage.getItem("secret")});
            if(isSec){
                sendData = JSON.stringify({ "sec":skey});
                localStorage.setItem("secret",skey)
            }
          var req = $.ajax({
              url: prefix + '/users/getDelData',
              type: 'POST',
              crossDomain: true,
              data: sendData,
              contentType: 'application/json',
              dataType: 'json',
          });
          
          
          req.done(function (data) {
              console.log(data)  
              localStorage.setItem("pub",data.pub)
              if(isSec){
                window.location.href = prefix+"/static/contact/delegate.html";
              }
              $('.vc').append('<span class="show">Vote Count: </span>'+'<span class="showAdd">'+data.vc+'</span>')
              $('.share').append('<span class="show">Share  : </span>'+'<span class="showAdd">'+data.share+'</span>')
              $('.rank').append('<span class="show">Rank    : </span>'+'<span class="showAdd">'+data.rank+'</span>')
  
          });
          
          req.fail(function (jqXHR, textStatus) {
              alert('fail')
              console.log(textStatus)
              console.log(jqXHR);
            
          });
  
        }
      }
      getDelData();
     function getBalance(){
      if(location.href.toString().includes("member")||location.href.toString().includes("vote")||location.href.toString().includes("delegate")){
 
        var req = $.ajax({
            url: prefix + posturi,
            type: 'POST',
            crossDomain: true,
            data: JSON.stringify({ "pub": localStorage.getItem("pub")}),
            contentType: 'application/json',
            dataType: 'json',
        });
        
        
        req.done(function (data) {
            console.log(data)  
            if(data.Msg[0].asset_code == "UPZ")
            $('.ubalance').append('<span class="show">Balance (UPZ): </span>'+'<span class="showAdd">'+data.Msg[0].balance+'</span>')
            if(data.Msg[0].asset_type == "native")
            $('.ubalance').append('<span class="show">Balance (native): </span>'+'<span class="showAdd">'+data.Msg[0].balance+'</span>')
            if(data.Msg[1].asset_type == "native")
            $('.ubalance').append('<span class="show">Balance (native): </span>'+'<span class="showAdd">'+data.Msg[1].balance+'</span>')

        });
        
        req.fail(function (jqXHR, textStatus) {
            alert('fail')
            console.log(textStatus)
            console.log(jqXHR);
          
        });

      }
    }
    getBalance();
    var name = $('.validate-input input[name="name"]');
    var email = $('.validate-input input[name="email"]');
    var message = $('.validate-input textarea[name="message"]');
  


    $('.validate-form').on('submit',function(e){
        var check = true;
        e.preventDefault();

        return true;
    });

 
    $('.inputclick').on('change',function(){
    console.log('cliccc')
        if($('.selection-2').val() == 'Delegate'){
           $('.dname').show();
           $('.dshare').show();
        }
        else{
            $('.dname').hide();
            $('.dshare').hide();
        }
    }) 
    
    $('.btnsubmitdel').on('click',function(){
        let posturl = "";
        let postdata = "";
         if($('.selection-2').val() == 'Delegate'){
            posturl = "/new/createAccountDelegate";
            postdata = JSON.stringify({ "name": $('.name').val(), "samount": $('.samount').val()});
         }
         else{
            posturl = "/new/createAccount";
            postdata = JSON.stringify({ });      
         }
    
     if($('.selection-2').val() !== 'Delegate'){     
    
        var requests = $.ajax({
        url: prefix + posturl,
        type: 'POST',
        crossDomain: true,
        data: postdata,
        contentType: 'application/json',
        dataType: 'json',
    });
    
    $('.loaddel').addClass('loader');
    
    requests.done(function (data) {
      //  alert('done')
        console.log(data)
        $('.loaddel').removeClass('loader');
        $('.resdata').html('<a target="_blank" href="'+data[0].Transaction._links.transaction.href.toString().replace(replaceValue,replaceHost)+'">Transaction Link</a>');
        $('.pub').html('Address : <b>'+data[1].publicKey+'</b>');
        $('.pri').html('Secret : <b>'+data[1].secretKey+'</b>');
        $('.esc').html('Escrow : <b>'+data[2].escrowPublicKey+'</b>');
        $('.ret').html('Retrive Key : <b>'+data[3].retrive+'</b>');
        $("#myModal").modal();
    
        localStorage.setItem("pub",data[1].publicKey);
        localStorage.setItem("secret",data[1].secretKey);
        localStorage.setItem("escrow",data[2].escrowPublicKey);
       
        
       $("#myModal").on("hidden.bs.modal", function () {
        window.location.href = prefix+"/static/contact/member.html";
    });
    
    
    });
    
    requests.fail(function (jqXHR, textStatus) {
        alert('fail')
        console.log(textStatus)
        console.log(jqXHR);
        $('.loaddel').removeClass('loader');
    });
     }
     else{

     //del code here



     let posturl = "";
     let postdata = "";
      if($('.selection-2').val() == 'Delegate'){
         posturl = "/new/createAccountDelegate";
         postdata = JSON.stringify({ "name": $('.name').val(), "community_share": $('.samount').val()});
      }
      else{
         posturl = "/new/createAccount";
         postdata = JSON.stringify({ });      
      }
     
 
     var requests = $.ajax({
     url: prefix + posturl,
     type: 'POST',
     crossDomain: true,
     data: postdata,
     contentType: 'application/json',
     dataType: 'json',
 });
 
 $('.loaddel').addClass('loader');
 
 requests.done(function (data) {
   //  alert('done')
     console.log(data)
     $('.loaddel').removeClass('loader');
     $('.resdata').html('<a target="_blank" href="'+data[1].Transaction._links.transaction.href.toString().replace(replaceValue,replaceHost)+'">Transaction Link</a>');
     $('.pub').html('Address : <b>'+data[0].publicKey+'</b>');
     $('.pri').html('Secret : <b>'+data[0].secretKey+'</b>');
     $('.esc').html('');
     $('.ret').html('Retrive Key : <b>'+data[4].retrive+'</b>');
     $("#myModal").modal();
 
     localStorage.setItem("pub",data[0].publicKey);
     localStorage.setItem("secret",data[0].secretKey);
     localStorage.setItem("escrow",null);
    
     
    $("#myModal").on("hidden.bs.modal", function () {
     window.location.href = prefix+"/static/contact/delegate.html";
 });
 
 
 });
 
 requests.fail(function (jqXHR, textStatus) {
     alert('fail')
     console.log(textStatus)
     console.log(jqXHR);
     $('.loaddel').removeClass('loader');
 });
  


     }
     
    })




 $('.btnsubmit').on('click',function(){


    $('.txterr').hide();

    if(!$('.isdel').prop('checked')){     
    let posturi = "/users/balance";
      var skey = $('.loginsecret').val();
      var req = $.ajax({
          url: prefix + posturi,
          type: 'POST',
          crossDomain: true,
          data: JSON.stringify({ "sec": skey}),
          contentType: 'application/json',
          dataType: 'json',
      });
      
      req.done(function (data) {
          console.log(data)  
          
          localStorage.setItem("pub",data.key);
          localStorage.setItem("escrow",data.escrow);
          localStorage.setItem("secret",skey);
          window.location.href = prefix+"/static/contact/member.html";
      });
      
      req.fail(function (jqXHR, textStatus) {
         // alert('fail')
         $('.txterr').show();
          console.log(textStatus)
          console.log(jqXHR);    
      });
    }
    else
    {
        getDelData(true);
    }

 })




 $('.btnstake').on('click',function(){
  
    $('.load').addClass('loader');

    let postUrlStakingB = "/new/createEscrowForStakingB";
      var skey = $('.loginsecret').val();
      var reqBalance = $.ajax({
          url: prefix + postUrlStakingB,
          type: 'POST',
          crossDomain: true,
          data: JSON.stringify({ "new_dest_account": localStorage.getItem("pub"),"amt":$('.stakeamt').val()}),
          contentType: 'application/json',
          dataType: 'json',
      });
      
      reqBalance.done(function (data) {
        $('.load').removeClass('loader');
        console.log(data)  
        $('.expireData').append('<div class="show">Time Expire Date: </div>'+'<div class="showAdd">'+data[3].timeExpireDate+'</div>');
        $('.expireData').append('<div class="show">Time Expire Seconds: </div>'+'<div class="showAdd">'+data[3].timeExpireSeconds+'</div>');
        $('.expireData').append('<div class="show">Raw XDR: </div>'+'<div class="showAdd">'+data[3].rawTxToBeSubimmited+'</div>');
        $('.expireData').addClass('border');
        $('.ubalance').html("");
        getBalance();
         
        
      });
      
      reqBalance.fail(function (jqXHR, textStatus) {
        $('.load').removeClass('loader');
          alert(jqXHR.responseText);
         console.log(textStatus)
          console.log(jqXHR);    
      });
 });


 
 $('.delegateVote').on('click',function(){
    window.location.href = prefix+"/static/contact/vote.html";
 })

 $('.btnvote').on('click',function(){
    
    $('.load').addClass('loader');

    let postVote = "/new/voteDelegate";
      var secret = localStorage.getItem("secret");
  
       if(secret == null){
           secret = prompt("Please enter your secret", "")
       }

      var reqBalance = $.ajax({
          url: prefix + postVote,
          type: 'POST',
          crossDomain: true,
          data: JSON.stringify({ "secret": secret,"del_address":$('.deladdress').val()}),
          contentType: 'application/json',
          dataType: 'json',
      });
      
      reqBalance.done(function (data) {
        $('.load').removeClass('loader');
        $('.expireData').append('<div class="show">Status: </div>'+'<div class="showAdd">'+data.Msg+'</div>');
        $('.expireData').addClass('border');
          console.log(data)  
        
      });
      
      reqBalance.fail(function (jqXHR, textStatus) {
        $('.load').removeClass('loader');
          alert(JSON.parse(jqXHR.responseText).Msg);
         console.log(textStatus)
          console.log(jqXHR);    
      });


 })


 
 $('.retrive').on('click',function(){


    let postVote = "/users/verifyKey";
    let pass = prompt("Please enter your password", "");
    if(pass==null)
    return;
      var pub = localStorage.getItem("pub");
      var reqsec = $.ajax({
          url: prefix + postVote,
          type: 'POST',
          crossDomain: true,
          data: JSON.stringify({ "address": pub,"password":pass}),
          contentType: 'application/json',
          dataType: 'json',
      });
      
      reqsec.done(function (data) {
        $('.load').removeClass('loader');
       
         if(data.verified == true){
             alert("Your Secret - "+data.secret)
         }
         else{
            alert('not found')
         }
          console.log(data)  
      });
      
      reqsec.fail(function (jqXHR, textStatus) {
        $('.load').removeClass('loader');
          alert(jqXHR.responseText);
         console.log(textStatus)
          console.log(jqXHR);    
      });

 });

 $('.transfer').on('click',function(){




    let postVote = "/users/sendPayment";
    let sec = prompt("Please enter your secret", "");
    if(sec == null)
    return;
    let dest = prompt("Please enter destination address", "");
    if(dest==null)
    return;
    let amt = prompt("Please enter the amount", "");
    if(amt==null)
    return;

    var transfer = $.ajax({
        url: prefix + postVote,
        type: 'POST',
        crossDomain: true,
        data: JSON.stringify({ "sec": sec,"pub":dest,"amt":amt}),
        contentType: 'application/json',
        dataType: 'json',
    });
    
    transfer.done(function (data) {      
        alert(data._links.transaction.href.toString().replace(replaceValue,replaceHost)); 
        console.log(data)  
    });
    
    transfer.fail(function (jqXHR, textStatus) {
     
        alert(jqXHR.responseText);
       console.log(textStatus)
        console.log(jqXHR);    
    });


 });


$('.stakeDel').on('click',function(){
    alert("Create member account to stake !");
});


})(jQuery);
