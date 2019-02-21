try{
	require('./base');
} catch(e){
	console.log(e)
}
require('./swipe.js');
import Swal from 'sweetalert2'

$("#expander").click(function(event) {
	$(".sider").toggleClass('expand');
	$(this).toggleClass('expand');
});

$("#plus").click(function(event) {
	$(this).toggleClass('expand');
});

$('.side-flow').click(function(event) {
	$(this).closest('.sider').removeClass('expand');
	$(".expander").removeClass('expand');
});

$("#sider").click(function(event) {
	event.stopPropagation();	
});





/*
$("body").on('swipeleft',function(event){
	alert("demo");
});
/*
$("#list-parent").hide();
$("#dropdown-status").click(function(event) {
	$("#list-parent").slideToggle('fast');
});


$(document).on('click', '.btn-switch', function(event) {
	event.preventDefault();
	if($(this).closest('.parent-option').attr('status') == "on") {
		$(this).closest('.parent-option').attr('status','off');	
	} else {
		$(this).closest('.parent-option').attr('status','on');
	}
});

$(document).on('change', '.control-option-type', function(event) {
	event.preventDefault();
	$(this).closest('.parent-option').attr('type',$(this).val());
});

$(document).on('click', '.delete-me', function(event) {
	event.preventDefault();
	var id  = $(this).closest('.parent-option').attr('data-id');
	Swal.fire({
		  title: 'Are you sure ?',
		  text: "Remove this configuration ?",
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: 'var(--danger)',
		  cancelButtonColor: 'var(--primary)',
		  confirmButtonText: 'Yes, delete it!'
		  }).then((result) => {
			  if (result.value) {
			    window.location.href =  "/delete/"+id;
			  }
	})
});

$(document).on('click', '.save-me', function(event) {
	event.preventDefault();
	var par  =  $(this).closest('.parent-option');
	var id =  par.attr('data-id');
	var mode =  par.attr('type');
	var status =  par.attr('status');
	var interval   =  par.find('.interval-option').val();
	var eswitch   =  par.find('.switch-option').val();

	$.ajax({
		url: '/update',
		type: 'POST',
		data: {
			id        : id,
			status    : status,
			mode      : mode,
			switch    : eswitch,
			interval   : interval  

		}
	})
	.done(function(e) {
		console.log("success  " + e);
	})
	.fail(function(e) {
		alert("error : " + JSON.stringify(e))
	})
	.always(function(e) {
		console.log("completed .... ");
	});
	

});

$(document).on('click', '.button-refresh', function(event) {
	event.preventDefault();
	var url  =  window.location.href;
	window.location.href =  url;
});


setInterval(function(e){
	$.ajax({
		url: '/status',
		async: false
	})
	.done(function(data) {
		var data  = data[0];
		$("#remote-header").removeClass('bg-danger').addClass('bg-success');
		$(".btn-save").removeClass('disable');
		$(".u-status").text("Conneted");
		$(".user-status").removeClass('bg-danger').addClass('bg-success');
		$(".make-status").removeClass('d-none');
		$("#u-status").text("Connected");

		$(".make-status").attr('status', data.client);
		$("#c-status").text(data.client);
		$("#p-status").text(data.power);
		if(data.client == "disconnect") {
			$("#remote-header , #client-status").removeClass('bg-success').addClass('bg-danger');
		} else {
			$("#remote-header , #client-status").removeClass('bg-danger').addClass('bg-success');
		}

		if(data.power == "battery") {
			$("#power-status").removeClass('bg-success').addClass('bg-warning');
		} else {
			$("#power-status").removeClass('bg-warning').addClass('bg-success');
		}
	})
	.fail(function(err) {
		$("#u-status").text("Disconnect");
		$("#remote-header").addClass('bg-danger').removeClass('bg-success');
		$(".btn-save").addClass('disable');	
		$(".u-status").text("Disconnect");
		$(".user-status").removeClass('bg-success').addClass('bg-danger');
		$(".make-status").addClass('d-none');		
	})
	
	
},1000)


*/