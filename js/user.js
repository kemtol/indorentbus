jQuery(document).ready(function($)
{
	var dbRef = firebase.database().ref();
	var vendors = dbRef.child('vendors');
	
	vendors.on('child_added', snap => {
		var option = '<option value="'+snap.val()+'" id="'+snap.key+'">'+snap.val()+'</option>';
		$('#user_vendor').append(option);
	});

	vendors.on('child_changed', snap => {
		var optionChanged = '#'+snap.key;
		$(optionChanged).text(snap.val());
	});

	vendors.on('child_removed', snap => {
		var optionRemoved = '#'+snap.key;
		$(optionRemoved).remove();
	});

	$('#newUser').submit(function(event){
		var userData = 
		{
			'user_name'			: $('#user_name').val(),
			'user_email'		: $('#user_email').val(),
			'user_phone'		: $('#user_phone').val(),
			'user_vendor'		: $('#user_vendor').val(),
		};


		var danger = false;
		$('.required').each(function(){
			if($(this).val()=='')
			{
				$(this).parent().addClass('has-warning has-feedback');
				$(this).parent().find('.form-control-feedback').removeClass('hidden');
				if($(this).parent().find('.help-block').length==0) $(this).parent().append('<span class="help-block" style="font-size:11px;">'+$(this).parent().find('label').text()+' harus diisi.</span>');
				if(!danger){ 
					$(this).focus();
					danger = true;
				}
			}
		});

		if(!danger)	saveUser(userData);

		return false;
	});

	$(document).on('change','.required',function(e)
	{
		$(this).parent().removeClass('has-warning').removeClass('has-feedback');
		$(this).parent().find('.form-control-feedback').addClass('hidden');
		$(this).parent().find('.help-block').remove();
	});

});

function saveUser(userData)
{
	console.log(userData);

	//firebase.database().ref('fleets').set(fleetData);

	// Get a key for a new F;eet.
 //  	var newFleetKey = firebase.database().ref().child('fleets').push().key;
 //  	console.log(newFleetKey);
 //  	// firebase.database().ref('fleets/' + newFleetKey).set(fleetData);
 //  	// Write the new post's data simultaneously in the posts list and the user's post list.
	// var updates = {};
	// updates['/fleets/' + newFleetKey] = fleetData;
	// // updates['/user-fleets/' + uid + '/' + newFleetKey] = fleetData;

	// firebase.database().ref().update(updates);

	  //window.location = "{{ site.url }}/armada/tambah/?success=1";
}

function readURL(input,target) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = function (e) {
			$(target).attr('src',e.target.result).removeClass('hidden');
		}
		
		reader.readAsDataURL(input.files[0]);
	}
}