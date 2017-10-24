jQuery(document).ready(function($)
{
	var dbRef = firebase.database().ref();
	var facilities = dbRef.child('fleet_facilities');
	
	facilities.on('child_added', snap => {
		var checkBox = '<div class="checkbox">';
		checkBox += '	<label>';
		checkbox += '		<input type="'+snap.val()+'" />';
		checkBox += '	</label>';
		checkBox += '</div>';
		console.log(snap);	
		$('.facilities').append(checkBox);
	});
});
