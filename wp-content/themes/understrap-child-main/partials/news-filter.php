<?php
$uncat_id = get_cat_ID( 'Uncategorised' );

$care_homes = get_posts([
  'post_type' => 'care-home',
  'status' => 'publish',
  'numberposts' => -1
]);

$news_cats = get_categories( 
  [
    'orderby' => 'name',
    'order' => 'ASC',
    'hide_empty' => false,
    'exclude' => [$uncat_id]
  ]
);
?>
<form class="d-md-flex d-block" method="GET" action="<?= get_post_type_archive_link( 'post' ) ?>">
  <fieldset class="d-md-flex d-block">
    <label>
      <select class="mb-md-0 mb-4" name="news_care_home">
        <option value=""><?= __('Care Home', THEME_NAMESPACE) ?></option>
        <option value="all"><?= __('Show all news', THEME_NAMESPACE) ?></option>
      <?php
          foreach($care_homes as $option) {
      ?>
          <option value="<?= $option->ID ?>"<?= (isset($_GET['news_care_home']) && $_GET['news_care_home'] == $option->ID)? ' selected' : null ?>><?= $option->post_title ?></option>
      <?php
          }
      ?>
      </select>
    </label>
    <label>
      <select class="mb-md-0 mb-4" name="category_name">
        <option value=""><?= __('Categories', THEME_NAMESPACE) ?></option>
      <?php
          foreach($news_cats as $key=>$option) {
      ?>
        <option value="<?= $option->slug ?>"<?= (isset($_GET['category_name']) && $_GET['category_name'] == $option->slug)? ' selected' : null ?>><?= $option->name ?></option> 
      <?php
          }
      ?>
      </select>
    </label>
  </fieldset>
  <input type="submit" class="btn btn-primary" value="<?= __('Apply', THEME_NAMESPACE) ?>">
</form>