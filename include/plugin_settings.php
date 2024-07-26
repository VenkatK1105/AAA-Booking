<?php

require_once("Classes/Listings.class.php");

$ListingsObj = new Listings();
$base_url= $ListingsObj->get_base_url();

?>

<div class="aaa-booking-main card wrap">
	<div class="plugin-theme-title">
		<h1><?php _e( 'AAA Booking Form', WPS_TEXT_DOMAIN ); ?></h1>
		<p><?php _e( 'Welcome to AAA Booking', WPS_TEXT_DOMAIN ); ?></p>
	</div>
	<div id="wp-main-root"></div>
</div>

<?php

?>
