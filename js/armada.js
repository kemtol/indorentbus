jQuery(document).ready(function($)
{
	var dbRef = firebase.database().ref();
	var facilities = dbRef.child('fleet_facilities');
	
	facilities.on('child_added', snap => {
		var checkBox = '<div class="checkbox" id="'+snap.key+'Parent">';
		checkBox += '	<label>';
		checkBox += '		<input type="checkbox" name="facilities[]" value="'+snap.key+'"/> <span id="'+snap.key+'">'+snap.val()+'</span>';
		checkBox += '	</label>';
		checkBox += '</div>';
		$('.facilities').append(checkBox);
		console.log(snap)
	});

	facilities.on('child_changed', snap => {
		var liChanged = '#'+snap.key;
		$(liChanged).text(snap.val();
	});

	facilities.on('child_removed', snap => {
		var liRemoved = '#'+snap.key+'Parent';
		$(liRemoved).remove();
	});
});
