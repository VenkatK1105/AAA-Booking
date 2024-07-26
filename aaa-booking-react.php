<?php
/*
    Plugin Name: AAA Booking Plugin
    Description: A WordPress plugin using React and Redux for the frontend.
    Version: 1.0
    Author: Venkat
*/

if ( !defined( 'ABSPATH' ) ) exit;

// Plugin Defines
define( "WPS_FILE", __FILE__ );
define( "WPS_DIRECTORY", dirname(__FILE__) );
define( "WPS_TEXT_DOMAIN", dirname(__FILE__) );
define( "WPS_DIRECTORY_BASENAME", plugin_basename( WPS_FILE ) );
define( "WPS_DIRECTORY_PATH", plugin_dir_path( WPS_FILE ) );
define( "WPS_DIRECTORY_URL", plugins_url( null, WPS_FILE ) );

//require_once( WPS_DIRECTORY . '/include/Classes/Listings.class.php' );

// Plugin uninstall hook
register_uninstall_hook( WPS_FILE, array('AAA_Booking_Form', 'plugin_uninstall') );
// Act on plugin activation
register_activation_hook( __FILE__, "activate_myplugin" );
// Act on plugin de-activation
register_deactivation_hook( __FILE__, "deactivate_myplugin" );

function plugin_uninstall() { }
// Activate Plugin
function activate_myplugin() {
	// Execute tasks on Plugin activation
	// Insert DB Tables
	init_db_aaa_booking();
}

// De-activate Plugin
function deactivate_myplugin() {
	// Execute tasks on Plugin de-activation
	delete_tbl_from_db();
}

// Initialize DB Tables
function init_db_aaa_booking() {
	// WP Globals
	global $table_prefix, $wpdb;

	$aaa_booking_data = $table_prefix . 'aaa_booking_data';
	$charset_collate = $wpdb->get_charset_collate();

	// Include Upgrade Script
	require_once( ABSPATH . '/wp-admin/includes/upgrade.php' );

	$aaa_booking_sql = "CREATE TABLE $aaa_booking_data (
		id int(11) NOT NULL AUTO_INCREMENT,
		outage_type varchar(255) NOT NULL,
		county varchar(255) NOT NULL,
		zone int(11) NOT NULL,
		created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
		updated_at timestamp,
		PRIMARY KEY (id)
	) $charset_collate;";

	// Create Table
	dbDelta( $aaa_booking_sql );
}


function delete_tbl_from_db(){
    global $table_prefix, $wpdb;

    $tbl_array = [   
	  $wpdb->prefix . "aaa_booking_data",
  ];

  foreach ($tbl_array as $tbl_name) {
     $wpdb->query("DROP TABLE IF EXISTS $tbl_name");
  }
	delete_option("aaa_booking_db_version");
}


function booking_form_frontend(){
	$html = '<div id="booking-page-root" class="booking-container-block">';	
	$html .= '</div>';
	return $html;
}

add_shortcode('booking-form-frontend', 'booking_form_frontend');

// Require the main class file
require_once( WPS_DIRECTORY . '/include/main-class.php' );
require_once WPS_DIRECTORY . '/include/classes/class-settings-routes.php';