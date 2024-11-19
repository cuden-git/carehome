<div class="col-12 col-md-4">
  <div class="news__card<?= (isset($args['no-archive']))? ' news__card--no-archive' : null ?>">
    <figure class="news__card-img">
      <?= get_the_post_thumbnail( $post->ID, "large" ) ?>
    </figure>
    <div class="news__card-text">
      <h3 class="news__card-title"><?= $post->post_title ?></h3>
      <p><?= $post->post_excerpt ?></p>
      <a href="<?= get_permalink($post->ID) ?>" class="btn btn-primary" title="<?=__('Read More', THEME_NAMESPACE) ?>"><?=__('Read More', THEME_NAMESPACE) ?></a>
    </div>
  </div>
</div>
