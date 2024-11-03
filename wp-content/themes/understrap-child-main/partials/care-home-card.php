<?php
global $post;
?>
<div class="col-12 col-md-4 col-xxl-3 care-homes-list__card<?= (has_term('quantum-select', 'care-home-category'))? ' care-homes-list__card--premium' : null?>" data-map-coords="<?= $post->lng . '/' . $post->lat?>">
  <h5><?php the_title() ?> <br>Distance=<?= get_post_meta(get_the_ID(), 'ch_distance', true) ?> <br>lng=<?= $post->lng ?><br>lat=<?= $post->lat ?></h5>

  <?php //the_content() ?>
</div>