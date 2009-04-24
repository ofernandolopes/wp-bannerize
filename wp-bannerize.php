<?php
/*
Plugin Name: WP-BANNERIZE
Plugin URI: http://wordpress.org/extend/plugins/wp-bannerize/
Description: WP_BANNERIZE is a image banner manager. See <a href="options-general.php?page=wp-bannerize_admin.php">configuration panel</a> for more settings. For more info and plugins visit <a href="http://labs.saidmade.com">Labs Saidmade</a>.
Version: 1.4.2
Author: Giovambattista Fazioli
Author URI: http://labs.saidmade.com
Disclaimer: Use at your own risk. No warranty expressed or implied is provided.
 
	Copyright 2009 Saidmade Srl (email : g.fazioli@undolog.com)

	This program is free software; you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation; either version 2 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.
	
	You should have received a copy of the GNU General Public License
	along with this program; if not, write to the Free Software
	Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
	
	
	CHANGE LOG
	
	* 1.4.1		Clean code
	* 1.4.0     Rev UI - Fix upload server bug
	* 1.3.2		Fix bug to sort order with Ajax call 
	* 1.3.1     Update jQuery to last version
	* 1.3.0		New improve class object structure
	* 1.2.5		Remove a conflict with a new class object structure
	* 1.2		Re-write doc and readme.txt
	* 1.1		Rev, Fix and stable release
	* 1.0		First release

*/

require_once( 'wp-bannerize_class.php');

if( is_admin() ) {
	require_once( 'wp-bannerize_admin.php' );
	//
	$wp_bannerize_admin = new WPBANNERIZE_ADMIN();
} else {
	require_once( 'wp-bannerize_client.php');
	$wp_bannerize_client = new WPBANNERIZE_CLIENT();
	require_once( 'wp-bannerize_functions.php');
}

?>