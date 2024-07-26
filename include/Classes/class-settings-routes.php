<?php
/**
 * This file will create Custom Rest API End Points.
 */
class WP_AAA_Booking_Settings_Rest_Route {
    public function __construct() {
        add_action( 'rest_api_init', [ $this, 'create_rest_routes' ] );
    }

    public function create_rest_routes() {
        register_rest_route( 'aaa-booking/v1', '/settings', [
            'methods' => 'GET',
            'callback' => [ $this, 'get_settings' ],
            'permission_callback' => [ $this, 'get_settings_permission' ]
        ]);
        register_rest_route( 'aaa-booking/v1', '/settings', [
            'methods' => 'POST',
            'callback' => [ $this, 'save_settings' ],
            'permission_callback' => [ $this, 'save_settings_permission' ]
        ]);

        register_rest_route( 'aaa-booking/v1', '/me', [
            'methods' => 'GET',
            'callback' => [ $this, 'me' ],
        ]);
        register_rest_route('aaa-booking/v1', '/login', array(
            'methods' => 'POST',
            'callback' => 'app_user_login',
            'permission_callback' => '__return_true',
        ));
        register_rest_route('aaa-booking/v1', '/register', array(
            'methods' => 'POST',
            'callback' => 'app_user_register',
            'permission_callback' => '__return_true',
        ));
    }

    public function me() {
        if (is_user_logged_in()) {
            $current_user = wp_get_current_user();
            $user_roles = $current_user->roles;
            $user_role = !empty($user_roles) ? $user_roles[0] : 'no-role';
            // Create an array with the details
            $user_details = array(
                'ID' => $current_user->ID,
                'user_login' => $current_user->user_login,
                'user_email' => $current_user->user_email,
                'role' => $user_role,
            );
            return new WP_REST_Response(array('status' => true, 'data' => $user_details ), 200);
        } else {
            return new WP_REST_Response(array('status' => false, 'message' => 'You are not logged! Please Login First' ), 200);
        }
    }

    function app_user_login(WP_REST_Request $request) {
        $parameters = $request->get_json_params();
        $username = $parameters['username'];
        $password = $parameters['password'];
    
        if (empty($username) || empty($password)) {
            return new WP_Error('invalid_request', 'Username and password are required.', array('status' => 400));
        }
    
        $user = wp_authenticate($username, $password);
    
        if (is_wp_error($user)) {
            return new WP_Error('invalid_credentials', 'Invalid username or password.', array('status' => 401));
        }
    
        // Get user roles
        $user_roles = $user->roles;
        $user_role = !empty($user_roles) ? $user_roles[0] : '';
    
        // Prepare response
        $response = array(
            'user_id' => $user->ID,
            'username' => $user->user_login,
            'email' => $user->user_email,
            'role' => $user_role,
        );
    
        return new WP_REST_Response($response, 200);
    }

    public function app_user_register(WP_REST_Request $request) {
	    $responseArray = array();
        $parameters = $request->get_json_params();

        // Validate required fields
        if (empty($parameters['first_name']) || empty($parameters['last_name']) || empty($parameters['user_email']) || empty($parameters['username']) || empty($parameters['password'])) {
            return new WP_Error('invalid_data', 'Please fill all required fields.', array('status' => 400));
        }
		
        try {
            $first_name = sanitize_text_field($parameters['first_name']);
            $last_name = sanitize_text_field($parameters['last_name']);
            $user_email = sanitize_email($parameters['user_email']);
            $user_name = sanitize_user($parameters['username']);
            $password = sanitize_text_field($parameters['password']);

            // Check if email already exists
            if (email_exists($user_email)) {
                wp_send_json_error(array(
                    'success' => false,
                    'message' => 'email already exists.'
                ));
                return;
            }

            $userdata = array(
                'user_nicename'     => $first_name.' '.$last_name,
                'user_email'     => $user_email,
                'user_login'       => $first_name.' '.$last_name,
                'user_pass'         => $password,
                'display_name'       => $first_name.' '.$last_name,
                'nickname'         => $first_name.'_'.$last_name,
                'first_name'       => $first_name,
                'last_name'       =>  $last_name,
            );
            
            $user_id = wp_insert_user($userdata);
        
            if (!is_wp_error($user_id)) {
                wp_send_json_success(array(
                    'success' => true,
                    'last_id' => $user_id,
                    'message' => 'User Registered successfully.'
                ));
            } else {
                wp_send_json_error(array(
                    'success' => false,
                    'message' => 'Failed to register user.'
                ));
            }
        } catch (Exception $e) {
                // Return error response
                wp_send_json_error(array(
                    'success' => false,
                    'message' => $e->getMessage()
                ));
        }
		
	}

    public function get_settings() {
        return new WP_REST_Response(array('message' => 'Hello from WordPress!'), 200);
    }

    public function get_settings_permission() {
        return true;
    }

    public function save_settings( $req ) {
        return new WP_REST_Response(array('message' => 'Hello from WordPress!'), 200);
    }
}

new WP_AAA_Booking_Settings_Rest_Route();