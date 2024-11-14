<?php
$ctas = get_sub_field('cta_blocks');
?>

<section class="post-section fc__ctas">
  <div class="container">
    <div class="row">
  <?php
    foreach($ctas as $cta) {
  ?>
      <div class="col-12 col-md-6">
        <div class="fc__ctas-card<?= ($cta['bg_colour'] === 'dark_blue')? ' fc__ctas-card--dark' : null ?> d-flex">
          <h3 class="fc__ctas-card-title"><?= $cta['title'] ?></h3>
          <?= $cta['text'] ?>
          <a href="<?= $cta['cta_btn']['url'] ?>" class="btn btn-white" title="<?= $cta['cta_btn']['title'] ?>"><?= $cta['cta_btn']['title'] ?></a>
        </div>
      </div>
  <?php
    }
  ?>
    </div>
  </div>
</section>
