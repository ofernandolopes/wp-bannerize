/**
 * Javascript functions
 *
 * @package         WP Bannerize
 * @subpackage      wpBannerzieAdmin.min.js
 * @author          =undo= <g.fazioli@undolog.com>, <g.fazioli@saidmade.com>
 * @copyright       Copyright © 2008-2011 Saidmade Srl
 * @version         3.0
 */


var WPBannerizeJavascript = {

	version: '1.1',

	/**
	 * Call when the user click on "Update" button on inline edit form
	 *
	 * @param id
	 *   Database id row
	 */
	update : function(id) {
		var f = document.forms['form_show'];
		f.id.value = id;
		f.action.value = 'wpBannerizeUpdate';
		jQuery('span.wpBannerizeAjaxLoader').fadeIn(function() {
			jQuery('div.inline-edit').slideUp(function(){
				jQuery.post(wpBannerizeJavascriptLocalization.ajaxURL, jQuery("form#posts-filter").serialize(),
						function(data) {
							jQuery(this).parent().html('');
							//alert(data);
							var result = data;
							jQuery.post(wpBannerizeJavascriptLocalization.ajaxURL, { action: 'wpBannerizeRowItemWithID', id: id}, function(data) {
								jQuery('tr#item_'+id).html(data);
								jQuery('span.wpBannerizeAjaxLoader').fadeOut();
								alert(result);
							});
						}
				);
			});
		});
	},

	displayEdit : function(id) {
		jQuery.post( wpBannerizeJavascriptLocalization.ajaxURL, { action: 'wpBannerizeInlineEdit', id: id },
            function( data ) {
                WPBannerizeJavascript.showInlineEdit('div#edit_'+id, data);
            }
        );
	},

	/**
	 * Call when the user click on "Edit" link in the Show View
	 *
	 * @param id
	 *   HTML DIV id
	 * @param c
	 *   HTML Ajax result
	 */
	showInlineEdit : function(id, c) {
		if( jQuery(id).html() == "" ) {
			// Close all open inline edit
			jQuery('div.inline-edit').slideUp(function(){jQuery(this).parent().html('')});

			// jQuery(id).html( unescape(c) );
			jQuery(id).html( c );
			jQuery('div.inline-edit').slideDown();

			jQuery('input.date').datetimepicker({
				timeOnlyTitle: wpBannerizeJavascriptLocalization.timeOnlyTitle,
				timeText: wpBannerizeJavascriptLocalization.timeText,
				hourText: wpBannerizeJavascriptLocalization.hourText,
				minuteText: wpBannerizeJavascriptLocalization.minuteText,
				secondText: wpBannerizeJavascriptLocalization.secondText,
				currentText: wpBannerizeJavascriptLocalization.currentText,
				dayNamesMin: (wpBannerizeJavascriptLocalization.dayNamesMin).split(','),
				monthNames: (wpBannerizeJavascriptLocalization.monthNames).split(','),
				closeText: wpBannerizeJavascriptLocalization.closeText,
				dateFormat: wpBannerizeJavascriptLocalization.dateFormat
			});

			// Combo Group
			jQuery('select#group_filter').change(function() {
				jQuery('input#group').val(jQuery(this).val());
			});

			// Radio button choice
			jQuery('input[name="wpBannerizeBannerType"]').click(function(){
				var value = jQuery(this).val();
				for(var i = 1; i < 4; i++) {
					var divClass = "wpBannerizeBannerType" + i;
					if(i != value) {
						jQuery('div.'+divClass+'').slideUp();
					} else {
						jQuery('div.'+divClass+'').slideDown();
					}
				}
			});

			// Media Library
			jQuery('#wpBannerizeButtonFromMediaLibrary').click(function() {
				jQuery('html').addClass('Image');
				formfield = jQuery('#filenameFromURL').attr('name');
				tb_show('', 'media-upload.php?type=image&TB_iframe=true');
				return false;
			});

			window.original_send_to_editor = window.send_to_editor;
			window.send_to_editor = function(html) {
				var fileurl;
				if (formfield != null) {
					fileurl = jQuery('img',html).attr('src');
					jQuery('#filenameFromURL').val(fileurl);
					tb_remove();
					jQuery('html').removeClass('Image');
					formfield = null;
				} else {
					window.original_send_to_editor(html);
				}
			};
		}
	},

	/**
	 * Call when the user click on "Cancel" button on inline edit form
	 *
	 * @param id
	 */
	hideInlineEdit: function( id ) {
		jQuery('div.inline-edit').slideUp(function() {
			jQuery('div#edit_' + id).html( "" );
		});
	}
};

/**
 * Document Ready setup
 */
jQuery(document).ready(function($) {
	$("a.fancybox").fancybox({
		'transitionIn'	:	'elastic',
		'transitionOut'	:	'elastic',
		'speedIn'		:	600,
		'speedOut'		:	200,
		'overlayShow'	:	false}
	);

	$('input.date').datetimepicker({
			timeOnlyTitle: wpBannerizeJavascriptLocalization.timeOnlyTitle,
			timeText: wpBannerizeJavascriptLocalization.timeText,
			hourText: wpBannerizeJavascriptLocalization.hourText,
			minuteText: wpBannerizeJavascriptLocalization.minuteText,
			secondText: wpBannerizeJavascriptLocalization.secondText,
			currentText: wpBannerizeJavascriptLocalization.currentText,
			dayNamesMin: (wpBannerizeJavascriptLocalization.dayNamesMin).split(','),
			monthNames: (wpBannerizeJavascriptLocalization.monthNames).split(','),
			closeText: wpBannerizeJavascriptLocalization.closeText,
			dateFormat: wpBannerizeJavascriptLocalization.dateFormat
	});

	$('table#wp_bannerize_list tbody tr').css('width',$('table#wp_bannerize_list').width() );
	$('table#wp_bannerize_list tbody').sortable({
				axis:"y",
				cursor:"n-resize",
				stop:function() {
					var data_items = $("table#wp_bannerize_list tbody").sortable("serialize");
					var rel_attr = $('table#wp_bannerize_list').attr('rel');
					var info = rel_attr.split(",");
					data_items += "&action=wpBannerizeSorter";
					data_items += "&offset=" + info[0];
					data_items += "&limit=" + info[1];
					$.ajax({
					type: "POST",
					url: wpBannerizeJavascriptLocalization.ajaxURL,
					data: data_items})
				}
	});

	// Combo Insert
	$('select#group_filter').change(function() {
		$('input#group').val($(this).val());
	});

	// edit
	$('span.edit a').click(function() {
		$('div#' + $(this).attr('class') ).slideDown();
	});

	// trash
	$('span.trash a').click(function() {
		var f = document.forms['wp_bannerize_action'];
		f.command_action.value = 'trash';
		f.id.value = $(this).attr('class');
		f.submit();
	});

	// delete
	$('span.delete a').click(function() {
		if( confirm( wpBannerizeJavascriptLocalization.messageConfirm ) ) {
			var f = document.forms['wp_bannerize_action'];
			f.command_action.value = 'delete';
			f.id.value = $(this).attr('class');
			f.submit();
		}
	});

	// restore
	$('span.restore a').click(function() {
		var f = document.forms['wp_bannerize_action'];
		f.command_action.value = 'untrash';
		f.id.value = $(this).attr('class');
		f.submit();
	});

	// Radio button choice
	$('input[name="wpBannerizeBannerType"]').click(function(){
		var value = $(this).val();
		for(var i = 1; i < 4; i++) {
			var divClass = "wpBannerizeBannerType" + i;
			if(i != value) {
				$('div.'+divClass+'').slideUp();
			} else {
				$('div.'+divClass+'').slideDown();
			}
		}
	});

	// Media Library
	$('#wpBannerizeButtonFromMediaLibrary').click(function() {
		$('html').addClass('Image');
		formfield = $('#filenameFromURL').attr('name');
		tb_show('', 'media-upload.php?type=image&TB_iframe=true');
		return false;
	});

	window.original_send_to_editor = window.send_to_editor;
	window.send_to_editor = function(html) {
		var fileurl;
		if (formfield != null) {
			fileurl = $('img',html).attr('src');
			$('#filenameFromURL').val(fileurl);
			tb_remove();
			$('html').removeClass('Image');
			formfield = null;
		} else {
			window.original_send_to_editor(html);
		}
	};

	// Switch
	$('div.wpBannerizeSwitch div').live('click', function() {
		//$(this).toggleClass('on');
		$(this).animate({marginLeft: ($(this).css('marginLeft') == '23px') ? '0' : '23px' }, 300, function() {
			$(this).parent().toggleClass('on');
			// Call Ajax to set enabled
			var enabled = $(this).parent().hasClass('on') ? '1' : '0';
			var id = $(this).parent().attr('id').split('_')[1];
			var params = {action: 'wpBannerizeSetEnabled', id: id, enabled: enabled };
			$.post( wpBannerizeJavascriptLocalization.ajaxURL, params );
		});
	});

	// Tools - Editor
	$('select#wpBannerizeEditorGroup, input#wpBannerizeEditorRandom, input#wpBannerizeEditorNoHTML, input#wpBannerizeEditorLimit, input.wpBannerizeCategoriesTree').change(wpBannerizeBuildFromEditor);
	$('input#wpBannerizeEditorLimit, input#wpBannerizeEditorBefore, input#wpBannerizeEditorAfter').keyup(wpBannerizeBuildFromEditor);
	$('textarea#wpBannerizeEditorPHPFunction, textarea#wpBannerizeEditorWordpressShortcode').focus(function(){
		$(this).select();
	});

	// Tools Database
	$("button[name='"+wpBannerizeJavascriptLocalization.wpBannerizeFormAction+"']").click(function(){
		if(!$('input#securityConfirm').is(':checked')) {
			alert(wpBannerizeJavascriptLocalization.messageTruncateConfirm);
			return false;
		} else {
			return(confirm(wpBannerizeJavascriptLocalization.messageTruncateConfirmAgain));
		}
	});

	// Settings
	$('input[name=wpBannerizeStyleDefault]').change(function(){
		if($(this).val() == 'custom') {
			$('textarea#wpBannerizeStyleCustom').addClass('disabled').removeAttr('disabled').css({color: '#fd0'});
		} else {
			$('textarea#wpBannerizeStyleCustom').removeClass('disabled').attr({disabled:'disabled'}).css({color: '#aaa'});
		}
	});

});

function wpBannerizeBuildFromEditor() {
	var params = "";
	var inputs = "";
	var shortCodeParams = "";
	var shortCodeInputs = "";
	var categories = "";

	if( jQuery('select#wpBannerizeEditorGroup option:selected').val() != '' ) {
		params += 'group=' + jQuery('select#wpBannerizeEditorGroup option:selected').val() + '&';
		shortCodeParams += 'group="' + jQuery('select#wpBannerizeEditorGroup option:selected').val() + '" ';
	}

	if( jQuery('input#wpBannerizeEditorNoHTML').is(':checked') ) {
		params += 'no_html_wrap=1&';
		shortCodeParams += 'no_html_wrap="1" ';
	}

	jQuery('input.wpBannerizeCategoriesTree:checked').each(function(i,e){
		categories += jQuery(e).val() + ",";
	});
	categories = categories.substr(0, categories.length-1);
	if(categories != "") {
		params += 'categories=' + categories + '&';
		shortCodeParams += 'categories="'+categories+'" ';
	}

	if( jQuery('input#wpBannerizeEditorRandom').is(':checked') ) {
		params += 'random=1&';
		shortCodeParams += 'random="1" ';
	}

	if( jQuery('input#wpBannerizeEditorLimit').val() != "" && jQuery('input#wpBannerizeEditorLimit').val() != "0") {
		params += 'limit='+jQuery('input#wpBannerizeEditorLimit').val()+'&';
		shortCodeParams += 'limit="'+jQuery('input#wpBannerizeEditorLimit').val()+'" ';
	}

	if( jQuery('input#wpBannerizeEditorBefore').val() != "") {
		params += 'before='+jQuery('input#wpBannerizeEditorBefore').val()+'&';
		shortCodeParams += 'before="'+jQuery('input#wpBannerizeEditorBefore').val()+'" ';
	}	

	if( jQuery('input#wpBannerizeEditorAfter').val() != "") {
		params += 'after='+jQuery('input#wpBannerizeEditorAfter').val()+'&';
		shortCodeParams += 'after="'+jQuery('input#wpBannerizeEditorAfter').val()+'" ';
	}

	// Compute
	if(params != "") {
		inputs = " '" + params.substr(0, params.length - 1) + "' ";
		shortCodeInputs = " "+shortCodeParams.substr(0, shortCodeParams.length - 1);
	}
	
	jQuery('textarea#wpBannerizeEditorPHPFunction').val("<?php if(function_exists( 'wp_bannerize' ))\n\twp_bannerize("+inputs+"); ?>");
	jQuery('textarea#wpBannerizeEditorWordpressShortcode').val("[wp_bannerize"+shortCodeInputs+"]");
}