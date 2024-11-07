<?php
  global $wp;

  $location = "";

  if(isset($_GET['location'])) {
    $location = $_GET['location'];
  }
?>
<form class="type-search" action="<?= add_query_arg( $_SERVER['QUERY_STRING'], '', home_url( $wp->request ) ) ?>">
  <div class="type-search__wrap">
    <input id="address-search" type="text" class="type-search__input" autocomplete="off">
    <div class="type-search__results"></div>
  </div>
  <input type="submit" class="type-search__btn" value="Search" disabled>
</form>
