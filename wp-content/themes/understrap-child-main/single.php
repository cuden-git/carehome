<?php
// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

get_header();
?>
<main class="site__main" id="main">
  <div class="container">
    <div class="row">
    <?php 
      if ( have_posts() ) {
        while ( have_posts() ) {
          the_post(); 
    ?>

    <?php
          the_content();
        } // end while
      } // end if
    ?>

    </div>
  </div>
  <?php
  get_footer();