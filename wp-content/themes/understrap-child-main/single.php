<?php
// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

$care_home_id = get_field('news_care_homes', get_the_ID());
$related_news = qc_related_news($care_home_id, 3);

get_header();
?>
<main class="site__main" id="main">
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-8 mx-md-auto">
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
    <div class="row">
      <?php
      foreach($related_news as $news) {
        get_template_part('/partials/news-card');
      }
      ?>
    </div>
    <div class="text-center">
    <div class="col-12">
      <a href="<?= get_post_type_archive_link('post') ?>" class="btn btn-primary" title="<?= __( 'See All News', THEME_NAMESPACE) ?>"><?= __( 'See All News', THEME_NAMESPACE) ?></a>
    </div>
    </div>
  </div>
</main>
  <?php
  get_footer();