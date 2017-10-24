jQuery(document).ready(function($)
{
	var dbRef = firebase.database().ref();
	var facilities = dbRef.child('fleet_facilities');
	
	facilities.on('value', snap => {
		console.log(snap.val());	
	});
});
