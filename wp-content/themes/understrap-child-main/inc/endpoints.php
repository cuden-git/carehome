<?php

/**
 * Add meta fields to post types endpoints
 */
register_rest_field( ['post', 'care-home'], 'meta', array(
  'get_callback' => function ( $data ) {
    return get_post_meta( $data['id'], '', '' );
}, ));
