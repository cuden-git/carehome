<?php
defined( 'ABSPATH' ) || exit;

get_header();
// print_r($terms = get_terms( array(
//   	'taxonomy' => 'careers-category',
//   	'hide_empty' => false,
//   ) ));

  //print_r(qc_get_careers_cats());
  $careers_cats = qc_get_careers_cats();

  print_r($_REQUEST);
?>

<main id="care-home-results" class="care-home-archive">
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-6">
        <form>
<?php
  foreach($careers_cats as $key=>$cat) {
?>
  <h6><?= $key ?></h6>
<?php
    foreach($careers_cats[$key] as $child_cat) {
?>
  <label>
    <input type="checkbox" name="term_ids[]" value="<?= $child_cat['term_id'] ?>">
    <?= $child_cat['name'] ?>
  </label>
<?php
    }
  }
?>
          <input type="submit" value="Submit">
        </form>
      </div>
    </div>
  </div>
</main>

<?
get_footer();
