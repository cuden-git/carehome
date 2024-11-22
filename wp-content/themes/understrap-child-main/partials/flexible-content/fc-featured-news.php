<?php
  $title = get_sub_field('title');
  $posts = get_sub_field('news_posts');
  $btn_label = get_sub_field('btn_label');
?>
<section class="post-section fc__featured mb-5">
  <div class="container">
    <h2 class="post-section__title"><?= $title ?></h2>
    <div class="row">
    <?php
    foreach($posts as $post) {
      $care_home_id = get_field('news_care_homes', $post->ID);
      $is_premium = (has_term('quantum-select', 'care-home-category', $care_home_id))? true : false;
    ?>
      <div class="col-12 col-lg-6 mb-5">
        <div class="p-4 fc__featured-card<?= ($is_premium)? ' fc__featured-card--premium' : null ?>">
          <figure class="fc__featured-card-img">
            <?= get_the_post_thumbnail( $post->ID, 'large') ?>
          </figure>
          <div class="d-flex flex-column">
            <h3 class="fc__featured-card-title mb-3"><?= $post->post_title ?></h3>
            <p><?= $post->post_excerpt ?></p>
            <a href="<?= get_permalink($post->ID)?>" class="btn btn-white mt-3" title="<?= $btn_label ?>"><?= $btn_label ?></a>
          </div>
        </div>
      </div>
    <?php
    }
    wp_reset_postdata();
    ?>
    </div>
  </div>
</section>
