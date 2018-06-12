import Vue from 'vue';
import Router from 'vue-router';

const Page = resolve => {
  import('@/components/page/page').then(module => {
    resolve(module);
  });
};

const Image = resolve => {
  import('@/components/image/image').then(module => {
    resolve(module);
  });
};

const Video = resolve => {
  import('@/components/video/video').then(module => {
    resolve(module);
  });
};

const Book = resolve => {
  import('@/components/book/book').then(module => {
    resolve(module);
  });
};

const BookDetail = resolve => {
  import('@/components/book-detail/book-detail').then(module => {
    resolve(module);
  });
};

const Reading = resolve => {
  import('@/components/reading/reading').then(module => {
    resolve(module);
  });
};

const Gallery = resolve => {
  import('@/components/gallery/gallery').then(module => {
    resolve(module);
  });
};

const VideoPlayer = resolve => {
  import('@/components/video-player/video-player').then(module => {
    resolve(module);
  });
};

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Page,
      redirect: '/image',
      children: [
        {
          path: 'image/:categoryId',
          component: Image,
          props: true,
          children: [
            {
              path: ':galleryId',
              component: Gallery,
              props: true
            }
          ]
        },
        {
          path: 'video/:categoryId',
          component: Video,
          props: true,
          children: [
            {
              path: ':videoId',
              component: VideoPlayer,
              props: true
            }
          ]
        },
        {
          path: 'book/:categoryId',
          component: Book,
          props: true,
          children: [
            {
              path: ':bookId',
              component: BookDetail,
              props: true
            }
          ]
        },

        // {
        //   path: 'image',
        //   component: Image,
        //   children: [
        //     {
        //       path: ':categoryId',
        //       component: Image,
        //       props: true,
        //       children: [
        //         {
        //           path: ':galleryId',
        //           component: Gallery,
        //           props: true
        //         }
        //       ]
        //     }
        //   ]
        // },
        // {
        //   path: 'video',
        //   component: Video,
        //   children: [
        //     {
        //       path: ':categoryId',
        //       component: Video,
        //       props: true,
        //       children: [
        //         {
        //           path: ':videoId',
        //           component: VideoPlayer,
        //           props: true
        //         }
        //       ]
        //     }
        //   ]
        // },
        // {
        //   path: 'book',
        //   component: Book,
        //   children: [
        //     {
        //       path: ':categoryId',
        //       component: Book,
        //       props: true,
        //       children: [
        //         {
        //           path: ':bookId',
        //           component: BookDetail,
        //           props: true
        //         }
        //       ]
        //     }
        //   ]
        // },

        {
          path: 'reading/:bookId',
          component: Reading,
          props: true,
          children: [
            {
              path: ':catalogId',
              component: Reading,
              props: true
            }
          ]
        }

        // {
        //   path: 'image',
        //   component: Image,
        //   props: (route) => ({categoryId: route.query.category}),
        //   children: [
        //     {
        //       path: ':galleryId',
        //       component: Gallery,
        //       props: true
        //     }
        //   ]
        // },
        // {
        //   path: 'video',
        //   component: Video,
        //   props: (route) => ({categoryId: route.query.category}),
        //   children: [
        //     {
        //       path: ':videoId',
        //       component: VideoPlayer,
        //       props: true
        //     }
        //   ]
        // },
        // {
        //   path: 'video/category/:categoryId',
        //   component: Video,
        //   props: true
        // },
        // {
        //   path: 'book/category/:categoryId',
        //   component: Book,
        //   props: true
        // },
        // {
        //   path: 'book',
        //   component: Book,
        //   props: (route) => ({categoryId: route.query.category}),
        //   children: [
        //     {
        //       path: ':bookId',
        //       component: BookDetail,
        //       props: true
        //     }
        //   ]
        // }
      ]
    },
    {
      path: '*',
      component: Page
    }
  ]
});
