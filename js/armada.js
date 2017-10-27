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
		};

		var checked_facility = $('input[name=fleet_facilities]:checked');
		if(checked_facility.length>0)
		{
			facilities = [];
			checked_facility.each(function(){
				facilities.push($(this).val());
			});
			fleet.fleet_facilities = facilities;
		}
		saveArmada(fleet);

		return false;
	});

});

function saveArmada(fleet)
{
	console.log(currentUser);
	console.log(uid);
	var fleetData = {

	};
}
