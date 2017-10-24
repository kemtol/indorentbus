jQuery(document).ready(function($)
{
	var dbRef = firebase.database().ref();
	var facilities = dbRef.child('fleet_facilities');
	
	facilities.on('child_added', snap => {
		console.log(snap.val());	
	});
});
