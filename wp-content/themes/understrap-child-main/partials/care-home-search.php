<?php
global $wp;

$location = "";

if(isset($_GET['location'])) {
  $location = $_GET['location'];
}
$form_text = get_field('ch_archive_form_text', 'option');
?>

<div class="ch__search bg-primary">
  <h3 class="ch__search-titlem mb-3"><?= $form_text['title'] ?></h3>
  <div class="mb-3">
    <?= $form_text['text'] ?>
  </div>
  <form class="ch__search-form type-search d-flex" action="<?= add_query_arg( $_SERVER['QUERY_STRING'], '', home_url( $wp->request ) ) ?>">
    <div class="type-search__wrap d-flex flex-grow-1">
      <input id="address-search" type="text" class="type-search__input flex-grow-1 me-3" autocomplete="off">
      <div class="type-search__results"></div>
    </div>

    <input type="submit" class="btn btn-secondary type-search__btn" value="Search" disabled>
  </form>
  <p class="text-center my-3"><?= __('Or', THEME_NAMESPACE) ?>
  <!-- -->
  <form class="ch__search-form d-flex">
    <?php get_template_part('partials/care-homes-select') ?>
    <input type="submit" class="btn btn-secondary" value="Search">
  </form>
</div>
