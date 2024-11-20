<?php
$is_premium = qc_is_premium();
$brochures = get_field('ch_brochures_guides');

if($brochures) {
  ?>
  <section id="<?php qc_set_achor_index() ?>" class="post-section care-home__brochures">
    <div class="container">
      <h2 class="post-section__title"><?= __($brochures['title'], THEME_NAMESPACE) ?></h2>
      <div class="row">
        <ul>
        <?php
        foreach($brochures['docs'] as $brochure) { 
        ?>
          <li class="d-flex justify-content-between align-items-center">
            <h6 class="care-home__brochures-label"><?= $brochure['title'] ?></h6>
            <a href="<?= $brochure['file']['url'] ?>" class="btn<?= ($is_premium)? ' btn-gold' : ' btn-primary' ?>" target="_blank"><?= __('View', THEME_NAMESPACE) ?></a>
          </li>
        <?php
        }
        ?>
        </ul>
      </div>
    </div>
  </section>
<?php
}
?>