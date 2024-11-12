<?php

if (have_rows('home_flexible_fields')):
  while (have_rows('home_flexible_fields')) : the_row();
    if (get_row_layout() == 'latest_news'):
      get_template_part('/partials/flexible-content/fc-latest-news');
    elseif (get_row_layout() == 'feedback'):
      get_template_part('/partials/flexible-content/fc-testimonials');
    elseif (get_row_layout() == 'img_text'):
      get_template_part('/partials/flexible-content/fc-img-text-block');
    elseif (get_row_layout() == 'cta_blocks'):
      get_template_part('/partials/flexible-content/fc-cta-blocks');
    elseif (get_row_layout() == 'featured_news'):
      get_template_part('/partials/flexible-content/fc-featured-news');
    endif;
  endwhile;
else :

endif;
