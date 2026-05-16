$(document).ready(function () {
    if(window.location.protocol != "https:") {
	$('#disclaimer').append("<br/>Hvis du alligevel vil have sikkerhed på, så hop på TLS "+
				"<a href='https://cpr.lobner.dk/'>her</a>. "+
				"(samme side, anden protokol)");
    }
    $('#inputField').keyup(load);
    $('p#gender input').click(load);
    $('p#century input').click(load);
    $('#inputField').focus();
});
function load() {
    $("#amount").empty();
    $("#output").empty();
    var input = $('#inputField');
    if (input.val().length > 5 && input.val().length < 10) {
        var input_int = input.val();
        listPossibleNumbers(input_int);
    } else if(input.val().length == 10) {
        var input_int = input.val();
	listPossibleNumbers(input_int.slice(0,input_int.length-1))
	validateNumber();
    } else {
        $("#output").html("Indtast CPR (uden bindestreg)<br>"+
			  "Validering starter når input udgør en fødselsdato. <i>"+
			  "<br/>(format: DDMMYY)</i><br>");
    }
}
function listPossibleNumbers(date) {
    var intRegex = /^\d+$/;
    var num = date.split('');
    var amount = 0;
    //check the input is of correct format DDMMYY
    var day = num[0] + num[1];
    var month = num[2] + num[3];
    var year = num[4] + num[5];
    var secret = date.slice(6, date.length);
    if (!intRegex.test(date) || !isDate((month + "/" + day + "/" + year))) {
        $("#output").html("FEJL!<br><br><i>" + date.substr(0,6) +
			  "</i> er ikke en gyldig dato.");
        return false;
    }
    var limit = parseInt("10000".slice(0, 5 - secret.length));
    for (var i = 0; i < limit; i++) {
        var checksum = null;
        var ier = null;
	if (i < 10) i = "000" + i;
        else if (i < 100) i = "00" + i;
        else if (i < 1000) i = "0" + i;
        else i = "" + i
        ier = i.split('');
        //handle if some of the secret part has been typed in
        if (secret.length > 0) {
            var sec = secret.split('');
            for (var j = 0; j < sec.length; j++) {
                ier[j] = sec[j];
            }
        }
	//selection on gender
	if(weedOutGender(parseInt(ier[3])) == false) { continue; }
	//digits 6-10 have been entered or iteratively found
	if(weedOutBadSequenceNumbers(parseInt(ier[0]), parseInt(year)) == false) { continue; }
        checksum = (num[0] * 4 +
		    num[1] * 3 +
		    num[2] * 2 +
		    num[3] * 7 +
		    num[4] * 6 +
		    num[5] * 5 +
		    ier[0] * 4 +
		    ier[1] * 3 +
		    ier[2] * 2 +
		    ier[3] * 1);
        //verify that checksum modulo 11 is 0
        if (checksum % 11 === 0) {
            amount++;
	    $("#amount").html(amount + (amount > 1 ? " mulige..." : " fundet!"));
            var cl = null;
            //boy-girl?
            (ier[3] % 2 ? cl = 'boy' : cl = 'girl');
            //prints the possible numbers
            $("#output").append("<span class='" + cl + "'>" + date.slice(0, 6) +
				"-" + ier.join('') + "</span><br>");
        }
    }
    if($('#output').is(':empty')) { invalid(); }
}
function weedOutGender(genderCheck) {
    gender = $('p#gender input[name=gender]:checked').val();
    if( (gender == 'K') && (genderCheck % 2) != 0 ) { return false; }
    if( (gender == 'M') && (genderCheck % 2) != 1 ) { return false; }
    return true;
}
function weedOutBadSequenceNumbers(seq, year) {
    century = parseInt($('p#century input[name=century]:checked').val());
    if(year <= 36) {
	switch(century) {
	case 1800:
	    return false;
	case 1900:
	    if(seq > 3) return false;
	    return true;
	case 2000:
	    if(seq < 4) return false;
	    return true;
	default:
	    return true;
	}
    }
    if(year > 36 && year <= 57) {
	switch(century) {
	case 1800:
	    return false;
	case 1900:
	    if(seq > 4 && seq < 9) return false;
	    return true;
	case 2000:
	    if(seq < 5 || seq > 8) return false;
	    return true;
	default:
	    return true;
	}
    }
    if(year > 57) {
	switch(century) {
	case 1800:
	    if(seq < 5 || seq > 8) return false;
	    return true;
	case 1900:
	    //console.log(seq); //debug
	    if(seq > 4 && seq < 9) return false;
	    return true;
	case 2000:
	    return false;
	default:
	    return true;
	}
    }
}
function validateNumber() {
    $("#amount").empty();
    if($("#output span").html().replace('-','') == $("#inputField").val()) { valid(); }
    else { invalid(); }
}
function invalid() { $("#output").html("<span id='bad'>Ugyldigt CPR-nummer!</span>"); }
function valid() { $("#output").html("<span id='good'>Gyldigt CPR-nummer :)</span>"); }
function isDate(txtDate, separator) {
    var aoDate, // needed for creating array and object
    ms, // date in milliseconds
    month, day, year; // (integer) month, day and year
    // if separator is not defined then set '/'
    if (separator === undefined) {
        separator = '/';
    }
    // split input date to month, day and year
    aoDate = txtDate.split(separator);
    // array length should be exactly 3 (no more no less)
    if (aoDate.length !== 3) {
        return false;
    }
    // define month, day and year from array (expected format is m/d/yy)
    // subtraction will cast variables to integer implicitly
    month = aoDate[0] - 1; // because months in JS start from 0
    day = aoDate[1] - 0;
    year = aoDate[2] - 0;
    // test year range
    if (year < 0 || year > 99) {
        return false;
    }
    // convert input date to milliseconds
    ms = (new Date(year, month, day)).getTime();
    // initialize Date() object from milliseconds (reuse aoDate variable)
    aoDate = new Date();
    aoDate.setTime(ms);
    // compare input date and parts from Date() object
    // if difference exists then input date is not valid
    if (aoDate.getYear() !== year || aoDate.getMonth() !== month || aoDate.getDate() !== day) {
        return false;
    }
    // date is OK, return true
    return true;
}
