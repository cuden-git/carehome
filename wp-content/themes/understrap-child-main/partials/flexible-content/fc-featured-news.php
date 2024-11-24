<?php
  $title = get_sub_field('title');
  $posts = get_sub_field('news_posts');
  $btn_label = get_sub_field('btn_label');
?>
<section class="post-section fc__featured my-5">
  <div class="container">
    <h2 class="post-section__title mb-4"><?= $title ?></h2>
    <div class="row">
    <?php
    $loopCountFeat = 1;
    foreach($posts as $post) {
      $care_home_id = get_field('news_care_homes', $post->ID);
      $is_premium = (has_term('quantum-select', 'care-home-category', $care_home_id))? true : false;
    ?>
      <div class="col-12 col-lg-6 mb-5 h-auto">
          <div class="<?php if($loopCountFeat % 2 == 0){ echo "ms-lg-5 ms-0";  }else{ echo "me-lg-5 me-0"; } ?> pt-4 px-4 pb-5 h-100 fc__featured-card<?= ($is_premium)? ' fc__featured-card--premium' : null ?>">
            <figure class="fc__featured-card-img mb-4">
              <?= get_the_post_thumbnail( $post->ID, 'large') ?>
            </figure>
            <div class="d-flex flex-column flex-grow-1">
              <h4 class="fc__featured-card-title mb-3"><?= $post->post_title ?></h4>
              <div class="mb-4"><p><?= $post->post_excerpt ?></p></div> 
              <a href="<?= get_permalink($post->ID)?>" class="btn btn-white " title="<?= $btn_label ?>"><?= $btn_label ?></a>
            </div>
          </div>
      </div>
    <?php
     $loopCountFeat++;
    }
    wp_reset_postdata();
    ?>
    </div>
  </div>
</section>