<?php
defined('ABSPATH') || exit;
$page_btns = get_field('page_btns');

get_header();
?>
<main class="site__main">
  <div class="container">
    <div class="row">
    <?php the_content() ?>
    </div>

    <?php    
      if($page_btns) {
        $loop_index = 0;
    ?>
      <div class="">
        <?php
        foreach($page_btns as $btn) {
        ?>
        <a href="<?= $btn['btn']['url'] ?>" class="btn btn-primary<?= ($loop_index > 0)? ' btn-primary--inverse' : null ?>" title="<?= $btn['btn']['title'] ?>"><?= $btn['btn']['title'] ?></a>
        <?php
          ++$loop_index;
        }
        ?>
      </div>
    <?php
      }
    ?>
  </div>
</main>
<?php

get_footer();
