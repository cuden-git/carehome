<?php
global $post;
?>
<div class="col-12 col-md-4 col-xxl-3" data-map-coords="<?= $post->lng . '/' . $post->lat?>">
  <h5><?php the_title() ?> <br>Distance=<?= $post->distance ?> <br>lng=<?= $post->lng ?><br>lat=<?= $post->lat ?></h5>

  <?php //the_content() ?>
</div>