<?php
global $wp;

$location = "";

if(isset($_GET['location'])) {
  $location = $_GET['location'];
}
$distances = get_field('careers_distances', 'option');
$form_text = get_field('ch_archive_form_text', 'option');
?>

<div class="ch__search bg-primary">
  <h3 class="ch__search-titlem mb-3"><?= $form_text['title'] ?></h3>
  <div class="mb-3">
    <?= $form_text['text'] ?>
  </div>
  <form class="ch__search-form type-search d-md-flex d-block" action="<?= get_post_type_archive_link('care-home') ?>">
    <div class="type-search__wrap d-md-flex d-block flex-grow-1 mb-md-0 mb-4">
      <input id="address-search" placeholder="Enter postcode or town" name="location" type="text" value="<?= $location ?>" class="type-search__input flex-grow-1 me-md-3 me-0" autocomplete="off">
      <div class="type-search__results"></div>
    </div>
    <label class="flex-grow-1 d-md-flex d-block me-md-3 me-0 hide-on-home-page">
      <select name="ch_distance">
      <option value=""><?= __('Distance', THEME_NAMESPACE) ?></option>
        <?php
        foreach($distances as $distance) {
        ?>
          <option value="<?= $distance['distance'] ?>"<?php if (isset($_GET['ch_distance']) && $_GET['ch_distance'] === $distance['distance']) echo " selected"; ?>><?= $distance['distance'] ?></option>
        <?php
        }
        ?>
      </select>
    </label>
    <input type="submit" class="btn btn-secondary type-search__btn mt-md-0 mt-4" value="Search"<?= (empty($location))? " disabled" : null ?>>
  </form>
  <p class="text-center my-3"><?= __('Or', THEME_NAMESPACE) ?>
  <!-- -->
  <form id="care-home-select" class="ch__search-form d-md-flex d-block">
    <?php get_template_part('partials/care-homes-select') ?>
  </form>
</div>
