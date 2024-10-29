<?php
defined( 'ABSPATH' ) || exit;

get_header();
$tester = 'denis';
get_template_part( 'partials/archive-content-' . get_post_type(), null, ['tester' => $tester] );


get_footer();
