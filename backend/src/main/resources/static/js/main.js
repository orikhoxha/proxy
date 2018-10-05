$(document).ready(function(){

    $("#toggle-button").on("click", function(){
        $(".responsive-page").toggleClass("toggle-page"); 
    });
    
    
    var args = {
        color: '#fff',
      // This has to be the same size as the maximum width to
      // prevent clipping
      easing: 'easeInOut',
      duration: 1400,
      text: {
        autoStyleContainer: false
      },
      from: { color: '#3CC7F0', width: 2 },
      to: { color: '#3CC7F0', width: 2 },
    };

    args.step = function(state, circle) {
        
        circle.path.setAttribute('stroke', state.color);
        circle.path.setAttribute('stroke-width', state.width);

        var value = Math.round(circle.value() * 100);
        
        if (value === 0) {
          circle.setText('');
        } else {
          circle.setText(value);
        }

    };
    
    var circles = $(".circle");
    
    
    if(circles && circles.length !== 0) {
    
        for(var i = 1; i <= 3; i++) {
            var bar = new ProgressBar.Circle('#circle-' + i, args);
            bar.animate(Math.random());  // Number from 0.0 to 1.0
        }
    }
    
    var prices = [],
        credits = $(".credit-img img");

    if(credits && credits.length !== 0) {
        
        credits.each(function(){
            var credit = $(this).attr("data-credit");
            prices.push(credit);
        });
        
         //Check attribute change, return old value
        credits.attrchange({
                trackValues: true, 
                callback: function (event) {
                    var properties = $(this).attrchange('getProperties');
                    /*console.log('Attribute Name: ' + event.attributeName + ' Prev Value: ' + event.oldValue + ' New Value: ' + event.newValue);*/
                    $(this).attr(event.attributeName, event.oldValue);
                    $(this).attrchange('disconnect');
                    setTimeout(() => {
                         $(this).attrchange('reconnect');
                    },2000);
                }
        });


        // Image click update price
        credits.click(function(){
            var clicked = $(this);
            var credit = clicked.data("credit");
            
            if(prices.indexOf(credit + '') === -1){
                console.log("cheating");
                return;
            }
            
            var parent = $(this).parent();
            
            if(parent.hasClass("selected")){
            	parent.removeClass("selected");
            }else{
            	parent.addClass("selected");
            }
            
            var totalCredits = getSelectedCredits();
            $(".subtotal").html(totalCredits + ' Credits'); 
            $(".total").html(pretifyNum(totalCredits/10));
            $("#total_amount").val(totalCredits/10);
            $("#product_credit").val(totalCredits);
        });
        
        
        
        
    }
    
    function getSelectedCredits(){
    	var totalCredits = 0;
    	var summary = $("#summary");
    	var html = "";
    	$('.credit-img.selected img').each(function(){
    		var credit = $(this).data("credit");
    		html += (credit+" Credits<br>")
    		totalCredits += credit;
        });
    	summary.html("<p>"+ html + "</p>");
    	return totalCredits;	
    }
    
    
    /**** Helper functions *****/
    function isInt(n){
        return Number(n) === n && n % 1 === 0;
    }

    function isFloat(n){
        return Number(n) === n && n % 1 !== 0;
    }
    
    function pretifyNum(n){
        return '$' + n + '.00 USD';
    }
    
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    function matchExpression( str ) {
        var rgularExp = {
            contains_alphaNumeric : /^(?!-)(?!.*-)[A-Za-z0-9-]+(?<!-)$/,
            containsNumber : /\d+/,
            containsAlphabet : /[a-zA-Z]/,
            containsSpecialChars:  "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=",
            onlyLetters : /^[A-Za-z]+$/,
            onlyNumbers : /^[0-9]+$/,
            onlyMixOfAlphaNumeric : /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/

        }

        var expMatch = {};
        expMatch.containsNumber = rgularExp.containsNumber.test(str);
        expMatch.containsAlphabet = rgularExp.containsAlphabet.test(str);
        expMatch.alphaNumeric = rgularExp.contains_alphaNumeric.test(str)
        
        function checkSpecialChars(str){
            console.log(str);
            for(var ch in str){
                console.log(ch);
                if(rgularExp.containsSpecialChars.indexOf(str.charAt(ch)) !== -1){
                    return true;
                }
            }
            return false;
        }
        
        expMatch.onlyNumbers = rgularExp.onlyNumbers.test(str);
        expMatch.onlyLetters = rgularExp.onlyLetters.test(str);
        expMatch.mixOfAlphaNumeric = rgularExp.onlyMixOfAlphaNumeric.test(str);
        expMatch.containsSpecialChars = checkSpecialChars(str);
        return expMatch;

    }
   
    
    //define reusable back-login button
    var $backLoginButton = $("<a href='javascript:{}' id='back-login' data-target='login-form'>Back to login</a>");
    
    
    //onclick handler for back-login button
    $backLoginButton.on("click", function(event){
        $("form").each(function(){
            $(this).find(":input").val("");
            $(this).hide();
        });
        $("#login-form").show();
    });
    
    
    // onclick event for switching between new-account, forgot-password and login-form
    $("#new-account, #forgot-password").on("click", function(event){
        event.preventDefault();
        
        var currentBtn = $(this), dataTarget = currentBtn.attr("data-target");
        
        $("form").each(function(){
           if($(this).attr("id") === dataTarget){
               if(dataTarget !== 'login-form'){
                       $(this).append($backLoginButton);
               } 
               $(this).fadeIn();
           }else{
               $(this).hide();
           }
        });
    });
    
    
    
    function validateField($input, eventId){
        clearTimeout(timeout);
        
        //Remove notification for password mismatch when typing
        $(".warning-text").remove();
        
        timeout = setTimeout(function() {
            val = $input.val();
            testCases = matchExpression(val);
            
            $error = $("<p></p>").addClass("warning-text");
            $error.text("");
            $error.insertAfter($input);
            
            console.log(eventId);
            
            switch(eventId){
                    
                case "password":
                    if(val.length < 8 || testCases.onlyLetters || testCases.onlyNumbers || !testCases.containsSpecialChars){
                       $(".info-input-field.password").css("color","red");
                    }else{
                        $(".info-input-field.password").css("color","green");
                    }
                break;
                    
                case "retype-password":
                    if($("#password").val() !== $("#retype-password").val()){
                        $error.text("Passwords do not match");
                        
                    }else{
                        $(".warning-text").remove();
                    }
                break;
                    
                case "username":
                case "usernameLogin":
                    if(testCases.onlyNumbers){
                        $error.text("Username cannot contain only numbers");
                    }else if(testCases.containsSpecialChars){
                        $error.text("Username cannot contain special characters");
                    }else{
                        $(".warning-text").remove();
                    }
                break;
                    
                case "firstName":
                    if(!testCases.onlyLetters){
                        $error.text("Name cannot contain numbers or special characters");
                    }else{
                        $(".warning-text").remove();
                    }
                break;
                    
                case "lastName":
                    if(!testCases.onlyLetters){
                        $error.text("Last name cannot contain numbers or special characters");
                    }else{
                        $(".warning-text").remove();
                    }
                break;
                case "email":
                case "emailRecover":
                    if(!validateEmail(val)){
                        $error.text("Email is not valid");
                    }else{
                        $(".warning-text").remove();
                    }
                break;
            }
            
        }, 500);
    }
    
    var timeout = null;
    
    
    var targetedInputValidation = "#usernameLogin, #username, #password, #retype-password, #firstName, #lastName, #email, #emailRecover";
    
    //Validate password
    $(targetedInputValidation).on('keydown', function(event){
        $input= $(this);
        validateField($input,event.target.id);
    });



    //residential input clicks quantity


    $('.quantity').on('click',function (e) {
        var targetValue = $(this).attr("data-quantity");

        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();


        $('.bg-color-added-quantity').css('background-color','');

        $(this).css('background-color','#f1c40f');
        $(this).addClass('bg-color-added-quantity');

        $("#quantity").val(targetValue);

        console.log(targetValue);

        return false;
    });

    //residential input clicks region
    $(".region").on('click',function (e) {

        var targetValue = $(this).attr("data-region");

        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        $('.bg-color-added-region').css('background-color','');

        $(this).css('background-color','#f1c40f');
        $(this).addClass('bg-color-added-region');

        $("#region").val(targetValue);

        console.log(targetValue);

        return false;
    });

});

(function($){
    
    $(document).ready(function(){
        var SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50;
        var container, stats;
        var camera, scene, renderer;
        var particles, particle, count = 0;
        var mouseX = 0, mouseY = 0;
        var windowHalfX = window.innerWidth / 2;
        var windowHalfY = window.innerHeight / 2;
        init();
        animate();
        function init() {

          container = document.getElementById( 'waves' );

          camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
          camera.position.z = 1000;
          scene = new THREE.Scene();
          particles = new Array();
          var PI2 = Math.PI * 2;
          var material = new THREE.SpriteCanvasMaterial( {
            color: 0xffffff,
            // background: 0x16141e,
            program: function ( context ) {
              context.beginPath();
              context.arc( 0, 0, 0.5, 0, PI2, true );
              context.fill();
            }
          } );
          var i = 0;
          for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
            for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
              particle = particles[ i ++ ] = new THREE.Sprite( material );
              particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
              particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
              scene.add( particle );
            }
          }
          renderer = new THREE.CanvasRenderer({ alpha: true }); // Set alpha `true` for transparency
          renderer.setPixelRatio( window.devicePixelRatio );
          renderer.setSize( window.innerWidth, window.innerHeight );
          container.appendChild( renderer.domElement );

          document.addEventListener( 'mousemove', onDocumentMouseMove, false );
          document.addEventListener( 'touchstart', onDocumentTouchStart, false );
          document.addEventListener( 'touchmove', onDocumentTouchMove, false );
          //
          window.addEventListener( 'resize', onWindowResize, false );
        }
        function onWindowResize() {
          windowHalfX = window.innerWidth / 2;
          windowHalfY = window.innerHeight / 2;
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize( window.innerWidth, window.innerHeight );
        }
        //
        function onDocumentMouseMove( event ) {
          mouseX = event.clientX - windowHalfX;
          mouseY = event.clientY - windowHalfY;
        }
        function onDocumentTouchStart( event ) {
          if ( event.touches.length === 1 ) {
            event.preventDefault();
            mouseX = event.touches[ 0 ].pageX - windowHalfX;
            mouseY = event.touches[ 0 ].pageY - windowHalfY;
          }
        }
        function onDocumentTouchMove( event ) {
          if ( event.touches.length === 1 ) {
            event.preventDefault();
            mouseX = event.touches[ 0 ].pageX - windowHalfX;
            mouseY = event.touches[ 0 ].pageY - windowHalfY;
          }
        }
        //
        function animate() {
          requestAnimationFrame( animate );
          render();
        }
        function render() {
          camera.position.x += ( mouseX - camera.position.x ) * .05;
          camera.position.y += ( - mouseY - camera.position.y ) * .05;
          camera.lookAt( scene.position );
          var i = 0;
          for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
            for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
              particle = particles[ i++ ];
              particle.position.y = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) +
                ( Math.sin( ( iy + count ) * 0.5 ) * 50 );
              particle.scale.x = particle.scale.y = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 4 +
                ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 4;
            }
          }
          renderer.render( scene, camera );
          count += 0.1;
        }    
    });
    
})( jQuery );
