jQuery(document).ready(function($)
{
	var dbRef = firebase.database().ref();
	var facilities = dbRef.child('fleet_facilities');
	var types = dbRef.child('fleet_type');
	
	facilities.on('child_added', snap => {
		var checkBox = '<div class="checkbox" id="'+snap.key+'Parent">';
		checkBox += '	<label>';
		checkBox += '		<input type="checkbox" name="facilities[]" value="'+snap.key+'"/> <span id="'+snap.key+'">'+snap.val()+'</span>';
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
		var option = '<option value="'+snap.key+'" id="'+snap.key+'">'+snap.val()+'</option>';
		$('#jenisBis').append(option);
	});

	types.on('child_changed', snap => {
		var optionChanged = '#'+snap.key;
		$(optionChanged).text(snap.val());
	});

	types.on('child_removed', snap => {
		var optionRemoved = '#'+snap.key;
		$(optionRemoved).remove();
	});

	$(document).on('submit','form',function(e){
		alert($(this).serialize());
		return false;
	});

});
