<?php
/**
* Template Name: Careers roles
*/
?>

<?php
// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

get_header();
?>
<main class="site__main role" id="main">
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-6 page-intro">
        <h2 class="page-intro__title"><?php the_title() ?></h2>
        <?php the_content() ?>
      </div>
      <div class="">
        featured image here
      </div>
    </div>
  </div>
  <div class="post__section role__jobs">
    <div class="container">
      jobs here
    </div>
  </div>
</main>

<?php
get_footer();
