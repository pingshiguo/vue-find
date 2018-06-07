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
  import('@/base/gallery/gallery').then(module => {
    resolve(module);
  });
};

const VideoPlayer = resolve => {
  import('@/base/video-player/video-player').then(module => {
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
          path: 'image',
          component: Image
        },
        {
          path: 'image/category/:categoryId',
          component: Image,
          props: true
        },
        {
          path: 'video',
          component: Video
        },
        {
          path: 'video/category/:categoryId',
          component: Video,
          props: true
        },
        {
          path: 'book/category/:categoryId',
          component: Book,
          props: true
        },
        {
          path: 'book',
          component: Book,
          children: [
            {
              path: ':bookId',
              component: BookDetail,
              props: true
            }
          ]
        },
        {
          path: 'reading/:bookId',
          component: Reading,
          props: true
        },
        {
          path: 'gallery',
          component: Gallery
        },
        {
          path: 'player',
          component: VideoPlayer
        }
      ]
    }
  ]
});
