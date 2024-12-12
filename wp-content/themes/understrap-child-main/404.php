<?php
defined('ABSPATH') || exit;

get_header();
?>
<main class="site__main">
  <div class="container text-center mb-5 pb-3">
    <h1>404</h1>
    <div class="my-4">The page you are looking for can't be found</div>
    <a href="<?php echo get_home_url(); ?>" class="btn btn-primary d-inline-block">Go back to home</a>
  </div>
</main>
<?php

get_footer();