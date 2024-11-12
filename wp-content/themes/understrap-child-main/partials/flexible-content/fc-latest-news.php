<?php
$show = get_sub_field('show');
?>

<?php
if($show) {
  $title = get_sub_field('title');
  $posts = get_posts(
    [
      'numberposts' => 3
    ]
  );
?>
<section class="post-section fc__news">
  <div class="container">
    <h2 class="post-section__title"><?= $title ?></h2>
    <div class="row">
    <?php
    foreach($posts as $post) {
    ?>
      <div class="col-12 col-md-4">
        <div class="fc__news-card">
          <figure class="fc__news-card-img">
            <?= get_the_post_thumbnail( $post->ID, "large" ) ?>
          </figure>
          <h3 class="fc__news-card-title"><?= $post->post_title ?></h3>
          <p><?= $post->post_excerpt ?></p>
          <a href="<?= get_permalink($post->ID) ?>" class="btn btn-primary" title="<?=__('Read More', THEME_NAMESPACE) ?>"><?=__('Read More', THEME_NAMESPACE) ?></a>
        </div>
      </div>
    <?php
    }
    ?>
    </div>
  </div>
</section>
<?php
wp_reset_postdata();
}
?>