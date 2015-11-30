Handlebars.registerPartial('filter_bar', Handlebars.templates['filter_bar']);

$(document).on("keyup", "#filter", function(evt) {
	// create case-insensitive regexp
	var regex = new RegExp($(this).val(), 'i');
    $('.searchable tr').hide();
    $('.searchable tr').filter(function() {
        return regex.test($(this).text());
    }).show();
});