<?php
  $title = get_sub_field('title');
  $posts = get_sub_field('news_posts');
  $btn_label = get_sub_field('btn_label');
?>
<section class="post-section fc__featured">
  <div class="container">
    <h2 class="post-section__title"><?= $title ?></h2>
    <div class="row">
    <?php
    foreach($posts as $post) {
    ?>
      <div class="col-12 col-md-6">
        <div class="fc__featured-card">
          <h3><?= $post->post_title ?></h3>
          <p><?= $post->post_excerpt ?></p>
          <a href="<?= get_permalink($post->ID)?>" class="btn btn-white" title="<?= $btn_label ?>"><?= $btn_label ?></a>
        </div>
      </div>
    <?php
    }
    wp_reset_postdata();
    ?>
    </div>
  </div>
</section>
