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
<form>
  <fieldset class="d-flex">
    <label>
      <select>
        <option value=""><?= __('Care Home', THEME_NAMESPACE) ?></option>
      <?php //print_r($care_homes);
          foreach($care_homes as $option) {
      ?>
          <option value="<?= $option->ID ?>"><?= $option->post_title ?></option>
      <?php
          }
      ?>
      </select>
    </label>
    <label>
      <select>
        <option value=""><?= __('Ctegories', THEME_NAMESPACE) ?></option>
      <?php
          foreach($news_cats as $key=>$option) {
      ?>
        <option value="<?= $option->term_id ?>"><?= $option->name ?></option> 
      <?php
          }
      ?>
      </select>
    </label>
    <input type="submit" class="btn btn-primary" value="<?= __('Apply', THEME_NAMESPACE) ?>">
  </fieldset>
</form>