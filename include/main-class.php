<?php

// Block direct access to file
defined( 'ABSPATH' ) or die( 'Not Authorized!' );

global $wpdb;

class AAA_Booking_Form {

    public function __construct() {
        // Plugin Actions
        add_action( 'plugins_loaded', array($this, 'plugin_init') );
        add_action( 'wp_enqueue_scripts', array($this, 'plugin_enqueue_scripts') );
        //add_action( 'admin_enqueue_scripts', array($this, 'plugin_enqueue_admin_scripts') );
        add_action( 'admin_menu', array($this, 'plugin_admin_menu_function') );
    }


    /**
     * Plugin init function
     * init the polugin textDomain
     * @method plugin_init
     */
    function plugin_init() {
        // before all load plugin text domain
        load_plugin_textDomain( WPS_TEXT_DOMAIN, false, dirname(WPS_DIRECTORY_BASENAME) . '/languages' );
    }

    function plugin_admin_menu_function() {
        //create main top-level menu with empty content
        add_menu_page( __('AAA Booking Form', WPS_TEXT_DOMAIN), __('AAA Booking Form', WPS_TEXT_DOMAIN), 'administrator', 'wps-general', null, 'dashicons-schedule', 4 );
        // create top level submenu page which point to main menu page
        add_submenu_page( 'wps-general', __('General', WPS_TEXT_DOMAIN), __('General', WPS_TEXT_DOMAIN), 'manage_options', 'wps-general', array($this, 'plugin_settings_page') );
        // add the support page
        add_submenu_page( 'wps-general', __('Plugin Support Page', WPS_TEXT_DOMAIN), __('Support', WPS_TEXT_DOMAIN), 'manage_options', 'wps-support', array($this, 'plugin_support_page') );
    	//call register settings function
    	add_action( 'admin_init', array($this, 'plugin_register_settings') );
    }

    /**
     * Register the main Plugin Settings
     * @method plugin_register_settings
     */
    function plugin_register_settings() {
        register_setting( 'wps-settings-group', 'example_option' );
    	register_setting( 'wps-settings-group', 'another_example_option' );
    }

    /**
     * Enqueue the main Plugin admin scripts and styles
     * @method plugin_enqueue_scripts
     */
    function plugin_enqueue_admin_scripts() {
        wp_register_style( 'wps-admin-style', WPS_DIRECTORY_URL . '/assets/css/admin-style.css', array(), null );
        wp_enqueue_style('wps-admin-style');
        wp_enqueue_style('aaa-booking-style', WPS_DIRECTORY_URL  . '/build/assets/main-B1WWCbeZ.css', array(), null);
		wp_register_script('aaa-booking-js', WPS_DIRECTORY_URL  . '/build/assets/main-Bz_2N16S.js', array(), '1.0', true);
        wp_enqueue_script('jquery');
		wp_localize_script('jquery', 'MS_Ajax', array('ajaxurl' => admin_url( 'admin-ajax.php' )));
		wp_enqueue_script('aaa-booking-js');
    }

    /**ss
     * Enqueue the main Plugin user scripts and styles
     * @method plugin_enqueue_scripts
     */
    function plugin_enqueue_scripts() {
        wp_register_style( 'wps-user-style', WPS_DIRECTORY_URL . '/assets/css/user-style.css', array(), null );
        wp_register_style('aaa-booking-style', WPS_DIRECTORY_URL  . '/build/assets/main-B1WWCbeZ.css', array(), null);
        wp_register_script('aaa-booking-js', WPS_DIRECTORY_URL  . '/build/assets/main-Bz_2N16S.js', array(), '1.0', true);
        wp_enqueue_script('jquery');
        wp_enqueue_style('wps-user-style');
        wp_enqueue_style('aaa-booking-style');
        wp_enqueue_script('aaa-booking-js');
    }

    /**
     * Plugin main settings page
     * @method plugin_settings_page
     */
	 
	function plugin_settings_page() {
		include_once("plugin_settings.php");
	}

    /**
     * Plugin support page
     * in this page there are listed some useful debug informations
     * and a quick link to write a mail to the plugin author
     * @method plugin_support_page
     */
    function plugin_support_page() {
        global $wpdb, $wp_version;
        $plugin = get_plugin_data( WPS_FILE, true, true );
        $wptheme = wp_get_theme();
        $current_user = wp_get_current_user();
        // set the user full name for the support request
        $user_fullname = ($current_user->user_firstname || $current_user->user_lastname) ?
        	($current_user->user_lastname . ' ' . $current_user->user_firstname) : $current_user->display_name;    ?>
        <div class="aaa-booking-main card">
			<!-- support page title -->
			<h1><?php _e( 'AAA Booking Form Support', WPS_TEXT_DOMAIN ); ?></h1>
            <!-- support page description -->
			<p><?php _e( 'Please report this information when requesting support via mail.', WPS_TEXT_DOMAIN ); ?></p>
			<div class="support-debug">
				<div class="plugin">
					<ul>
						<li class="support-plugin-version"><strong><?php _e($plugin['Name']); ?></strong> version: <?php _e($plugin['Version']); ?></li>
						<li class="support-credits"><?php _e( 'Plugin author:', WPS_TEXT_DOMAIN ); ?> <a href="<?php echo $plugin['AuthorURI']; ?>"><?php echo $plugin['AuthorName']; ?></a></li>
					</ul>
				</div>
			</div>

            <div class="support-action">
                <button type="button" class="button" name="Send Mail">
                    <a style="text-decoration: none" href="mailto:venkatt1105@gmail.com">Mail Me</a>
                </button>
            </div>

        </div>

    <?php }
}

new AAA_Booking_Form;