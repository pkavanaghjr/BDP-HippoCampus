$(document).ready(function() {
			

// _______________________ WRITE QUERY STRING TO PAGE _____________________________________
	function writeTextToPage(textToWrite, destination){
		$(destination).html(textToWrite);
		
	};	


// NAV EASING //////////////////////////////////////
	$('#nav a, #bdpLogo').on('click', function(event){
		event.preventDefault();
		var $anchor = $(this);
		$('html, body').stop().animate({
			scrollLeft: $($anchor.attr('href')).offset().left-150
		}, 1500,'easeOutBack');
	});



// _______________________ BERT EMAIL FORM _____________________________________
	// VARIABLES
	var name = $("#name");
	var email = $("#email");
	var upload = $("#realInput");
	var button = $("#submit");
	
	
	// EVENT HANDLERS
	button.on("click", function(event){
		event.preventDefault();

		var nameForm = name.val();
		var emailForm = email.val();
		var uploadForm = upload.val();
		
		var validEmail = validateForm(emailForm);

		if(validEmail == true){
			
			$.ajax({
				url: "contact.php",
				type:'POST',
				data:
				{
					nameForm: nameForm,
					emailForm: emailForm,					
					uploadForm: uploadForm,
				},
				success: showConfirmation()    
			});
		} else {
			email.addClass("invalid");
		};

		writeTextToPage(nameForm+"!","#nameHolder");

		hideForm();

	});
	


	function validateForm(email) {
		var atpos = email.indexOf("@");
		var dotpos = email.lastIndexOf(".");
		if (atpos< 1 || dotpos<atpos+2 || dotpos+2>=email.length) {
			return false;
		};
		return true;
	};
	
	function showConfirmation(){
		console.log("Message sent!")
	}


	function hideForm(){		
		console.log("animate Out");
		$("#contactForm").stop(true).animate({opacity:0},750,function(){
			$("#contactForm").stop(true).delay(1200).css("display", "none");	
			$("#thankYou").stop(true).delay(1200).css("display", "block");	
			$("#thankYou").stop(true).delay(750).animate({opacity:1},750);
		});					
	};


	$('#fakeInput').on('click', function(event){
		event.preventDefault();
		$('#realInput').click();
	});

	$('#realInput').on('change', function(event){
		event.preventDefault();
		var fileName = $(this).val();
		writeValueToPage(fileName);
		
		var files = event.target.files;
		
		var reader = new FileReader();

		reader.onload = function() {
		  // setPreview(reader.result);
		};

		reader.readAsDataURL(files[0]);
		
	});

	$("#uploadForm").on("submit", function(event){
		event.preventDefault();
		// Hmmm...?
	});

	// FUNCTIONS
	function writeValueToPage(incomingValue){
		$("#pathHolder").html(incomingValue);
	};


	function setPreview(url) {
	  $('#myImage').attr('src', url);
	  
	  var image = document.createElement("img");
	  
	  $(image).attr("src", url);
	  
	  $("#meetSection").append(image)
	  
	}


	
});