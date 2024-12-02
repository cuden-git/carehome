<?php
$ctas = (isset($args['cta_blocks']))? $args['cta_blocks'] : get_sub_field('cta_blocks');
?>

<section class="post-section fc__ctas mt-5">
  <div class="container">
    <div class="row">
  <?php
      $loopCount = 1;
    foreach($ctas as $cta) {
  ?>
      <div class="col-12 col-md-6 mb-md-0 mb-4" >
        <div class="<?php if($loopCount % 2 == 0){ echo "ms-lg-5 ms-0";  }else{ echo "me-lg-5 me-0"; } ?> fc__ctas-card<?= ($cta['bg_colour'] === 'dark_blue')? ' fc__ctas-card--dark' : null ?> d-flex">
          <h3 class="mb-4"><?= $cta['title'] ?></h3>
          <div class="mb-4"><?= $cta['text'] ?></div>
          <a href="<?= $cta['cta_btn']['url'] ?>" class="btn btn-white" title="<?= $cta['cta_btn']['title'] ?>"><?= $cta['cta_btn']['title'] ?></a>
        </div>
      </div>
  <?php
    $loopCount++;
    }
  ?>
    </div>
  </div>
</section>
