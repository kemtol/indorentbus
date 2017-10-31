// Initialize Firebase
var config = {
	apiKey: "AIzaSyCzyFRMOT1r1JF8mM6tZpaJjMI7Gms9oyk",
	authDomain: "indorentbus-e66dc.firebaseapp.com",
	databaseURL: "https://indorentbus-e66dc.firebaseio.com",
	projectId: "indorentbus-e66dc",
	storageBucket: "indorentbus-e66dc.appspot.com",
	messagingSenderId: "1065904701560"
};
firebase.initializeApp(config);

// initiate jQuery
jQuery(document).ready(function($){

});

function doVendor(vendor,createVendor)
{
	if(createVendor)
	{
		var vendorData = {
			vendor_name		: vendor
		};

		var newVendorKey = firebase.database().ref().child('vendors').push().key;
		alert (newVendorKey);

		var updates = {};
		updates['/vendors/' + newVendorKey] = vendorData;
		updates['/vendors/users'] = currentUser.uid;
		// updates['/user-fleets/' + uid + '/' + newFleetKey] = fleetData;

		return firebase.database().ref().update(updates);
	}
}