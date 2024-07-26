<?php

class Listings {
	
	function get_base_url(){
		return get_site_url().'/';
	}
	
	function get_all_submisstions() {
		global $table_prefix, $wpdb;
		$aaa_booking_data = $table_prefix . 'aaa_booking_data';
		$sql = "SELECT * FROM $aaa_booking_data ORDER BY created_at DESC";
		$results = $wpdb->get_results($sql);
		$results_data = array(
			'data' => $results,
		);
	
		return $results_data;	
	}

}

?>