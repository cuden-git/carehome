<?php
defined('ABSPATH') || exit;
$page_btns = get_field('page_btns');

get_header();
?>
<main class="site__main">
  <div class="container mb-5 genric-page">
    <div class="row">
      <div class="col-md-10 mx-auto">
        <?php the_content() ?>
      </div>
    </div>
    <div class="row">
      <div class="col-md-10 mx-auto">
    <?php    
      if($page_btns) {
        $loop_index = 0;
    ?>
      <div class="">
        <?php
        foreach($page_btns as $btn) {
        ?>
        <a href="<?= $btn['btn']['url'] ?>" class="me-4 mb-4 btn btn-primary<?= ($loop_index > 0)? ' btn-primary--inverse' : null ?>" title="<?= $btn['btn']['title'] ?>"><?= $btn['btn']['title'] ?></a>
        <?php
          ++$loop_index;
        }
        ?>
      </div>
    <?php
      }
    ?>
    </div>
    </div>
  </div>
</main>
<?php

get_footer();
