jQuery(document).ready(function($)
{
	var dbRef = firebase.database().ref();
	var facilities = dbRef.child('fleet_facilities');
	
	facilities.on('child_added', snap => {
		var checkBox = '<div class="checkbox">';
		checkBox += '	<label>';
		checkBox += '		<input type="'+snap.val()+'" /> '+snap.val();
		checkBox += '	</label>';
		checkBox += '</div>';
		$('.facilities').append(checkBox);
		console.log(snap)
	});
});
