var file = require('file.js');
var fragement = null;

function Menu(cutLabel, copyLabel, pasteLabel) {
  var gui = require('nw.gui')
    , menu = new gui.Menu()

    , cut = new gui.MenuItem({
      label: cutLabel || "Cut"
      , click: function() {
        document.execCommand("cut");
      }
    })

    , copy = new gui.MenuItem({
      label: copyLabel || "Copy"
      , click: function() {
        document.execCommand("copy");
      }
    })

    , paste = new gui.MenuItem({
      label: pasteLabel || "Paste"
      , click: function() {
        document.execCommand("paste");
      }
    })
  ;

  menu.append(cut);
  menu.append(copy);
  menu.append(paste);

  return menu;
}

$(function() {
	$("#export").on("click", function() {
		chooseFile("#save");
	});

	file.read("rule.html", function(error, content) {
		fragement = content;
	});

	$("#addRule").on("click", function() {
		$("#rules").append(fragement);
	});

	$("#rules").on("click", "a.remove", function(event) {
		event.preventDefault();
		$(this).closest(".row").remove();
	})

	function generateMocoConf() {
		var rules = $("#rules .row");
		var config = [];

		$(rules).each(function(index, item) {
			var method = $('select[name="method"]', item).val();
			config.push({
				request: {
					method: method,
					uri: $('input[name="uri"]', item).val()
				},
				response: {
					text: $('textarea[name="text"]', item).val()
				}
			});
		});

		return JSON.stringify(config, null, 4);
	}

	function chooseFile(id) {
		var chooser = $(id);
		chooser.change(function(evt) {
			var config = generateMocoConf();
			var filename = $(this).val();
			file.save(filename, config);
		});

		chooser.trigger('click');
	}

  var menu = new Menu();
  $(document).on("contextmenu", function(e) {
    e.preventDefault();
    menu.popup(e.originalEvent.x, e.originalEvent.y);
  });

});