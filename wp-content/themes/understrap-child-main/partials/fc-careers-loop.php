<?php

if (have_rows('chub_layouts')):
  while (have_rows('chub_layouts')) : the_row();
    if (get_row_layout() == 'featured'):
      get_template_part('/partials/flexible-content/fc-featured-jobs');
    elseif (get_row_layout() == 'cta_blocks'):
      get_template_part('/partials/flexible-content/fc-cta-blocks');
    elseif (get_row_layout() == 'img_text'):
      get_template_part('/partials/flexible-content/fc-img-text-block');
    elseif (get_row_layout() == 'vid_text'):
      get_template_part('/partials/flexible-content/fc-video-text-block');
    elseif (get_row_layout() == 'feedback'):
      print_r(get_sub_field('feedback'));
      get_template_part('/partials/flexible-content/fc-testimonials');
    endif;
  endwhile;
else :

endif;
