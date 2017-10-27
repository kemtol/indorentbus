jQuery(document).ready(function($)
{
	var dbRef = firebase.database().ref();
	var facilities = dbRef.child('fleet_facilities');
	var types = dbRef.child('fleet_type');
	
	facilities.on('child_added', snap => {
		var checkBox = '<div class="checkbox" id="'+snap.key+'Parent">';
		checkBox += '	<label>';
		checkBox += '		<input type="checkbox" name="fleet_facilities" value="'+snap.val()+'"/> <span id="'+snap.key+'">'+snap.val()+'</span>';
		checkBox += '	</label>';
		checkBox += '</div>';
		$('.facilities').append(checkBox);
	});

	facilities.on('child_changed', snap => {
		var liChanged = '#'+snap.key;
		$(liChanged).text(snap.val());
	});

	facilities.on('child_removed', snap => {
		var liRemoved = '#'+snap.key+'Parent';
		$(liRemoved).remove();
	});

	
	types.on('child_added', snap => {
		var option = '<option value="'+snap.val()+'" id="'+snap.key+'">'+snap.val()+'</option>';
		$('#fleet_type').append(option);
	});

	types.on('child_changed', snap => {
		var optionChanged = '#'+snap.key;
		$(optionChanged).text(snap.val());
	});

	types.on('child_removed', snap => {
		var optionRemoved = '#'+snap.key;
		$(optionRemoved).remove();
	});

	$('#newFleet').submit(function(event){
		var fleet = 
		{
			'fleet_no'			: $('#fleet_no').val(),
			'fleet_type'		: $('#fleet_type').val(),
			'fleet_seat'		: $('#fleet_seat').val(),
			'fleet_year'		: $('#fleet_year').val(),
			'fleet_engine'		: $('#fleet_engine').val(),
			'fleet_stnk'		: $('#fleet_stnk').val(),
			'fleet_no_rangka'	: $('#fleet_no_rangka').val(),
			'fleet_image'		: $('#preview').attr('src'),
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

		var checked_facility = $('input[name=fleet_facilities]:checked');
		if(checked_facility.length>0)
		{
			$('.facilities').find('.help-block').remove();
			facilities = [];
			checked_facility.each(function(){
				facilities.push($(this).val());
			});
			fleet.fleet_facilities = facilities;
		}
		else
		{
			if($('.facilities').find('.help-block').length==0) $('.facilities').append('<span class="help-block" style="font-size:11px;">Fasilitas harus dipilih minimal 1.</span>');
			if(!danger) 
			{
				$('#forms-activities').focus();
				danger = true;
			}
		}

		if(!danger)	saveArmada(fleet);

		return false;
	});

	$(document).on('change','#fleet_image',function(e)
	{
		var target = $(this).parent().find('#preview');
		readURL(this,target);
	});

	$(document).on('change','.required',function(e)
	{
		$(this).parent().removeClass('has-warning').removeClass('has-feedback');
		$(this).parent().find('.form-control-feedback').addClass('hidden');
		$(this).parent().find('.help-block').remove();
	});

});

function saveArmada(fleet)
{
	var fleetData = {
		author			: currentUser.displayName,
		uid				: currentUser.uid,
		fleet_no		: fleet.fleet_no,
		fleet_type		: fleet.fleet_type,
		fleet_seat		: fleet.fleet_seat,
		fleet_year		: fleet.fleet_year,
		fleet_engine	: fleet.fleet_engine,
		fleet_stnk		: fleet.fleet_stnk,
		fleet_no_rangka	: fleet.fleet_no_rangka,
		fleet_image		: fleet.fleet_image,
	};

	console.log(fleetData);

	// Get a key for a new F;eet.
  	var newFleetKey = firebase.database().ref().child('fleets').push().key;

  	// Write the new post's data simultaneously in the posts list and the user's post list.
	  var updates = {};
	  updates['/fleets/' + newFleetKey] = fleetData;
	  updates['/user-fleets/' + uid + '/' + newFleetKey] = fleetData;

	  firebase.database().ref().update(updates);

	  window.location = "{{ site.url }}/armada/tambah/?success=1";
}

function readURL(input,target) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = function (e) {
			console.log(e.target.result);
			$(target).attr('src',e.target.result).removeClass('hidden');
		}
		
		reader.readAsDataURL(input.files[0]);
	}
}