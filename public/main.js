var file = require('file.js');

$(function() {
	$("#export").on("click", function() {
		chooseFile("#save");
	});

  function chooseFile(id) {
    var chooser = $(id);
    chooser.change(function(evt) {
    	var config = $("#config").text();
		var filename = $(this).val();
		file.save(filename, config);
    });

    chooser.trigger('click');
  }

	// var handler = function() {
	// 	var config = $("#config").text();
	// 	var filename = $(this).val();
	// 	alert(filename);
	// 	// file.save(filename, config);
	// };

	// $("#export").on('change', handler);
});