<?php
$care_homes = get_posts([
  'post_type' => 'care-home',
  'status' => 'publish'
]);

$news_cats = get_categories( 
  [
    'orderby' => 'name',
    'order' => 'ASC',
    'hide_empty' => false
  ]
);
?>
<form class="d-flex" metyhod="get">
  <fieldset class="d-flex">
    <label>
      <select name="news_care_home">
        <option value=""><?= __('Care Home', THEME_NAMESPACE) ?></option>
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
      <select name="category_name">
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