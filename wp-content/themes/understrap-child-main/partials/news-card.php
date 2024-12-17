<div class="col-12 col-lg-4 col-md-6 mb-lg-4 mb-4" data-aos="fade-up">
  <div class="news__card<?= (isset($args['no-archive']))? ' news__card--no-archive' : null ?>">
    <figure class="news__card-img">
      <?= get_the_post_thumbnail( $post->ID, "large" ) ?>
    </figure>
    <div class="news__card-text">
      <h2 class="news__card-title mb-3 pb-0"><?= $post->post_title ?></h2>
      <p class="pb-3"><?= $post->post_excerpt ?></p>
      <a href="<?= get_permalink($post->ID) ?>" class="btn btn-primary" title="<?=__('Read More', THEME_NAMESPACE) ?>"><?=__('Read More', THEME_NAMESPACE) ?></a>
    </div>
  </div>
</div>
