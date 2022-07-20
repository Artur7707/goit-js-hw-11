import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { PixabayAPI } from './fetchAPI';
import refs from '../refs';
import { makeMarkup } from './markup';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const api = new PixabayAPI();

refs.form.addEventListener('submit', async e => {
  e.preventDefault();
  successNotification(api.searchParams.get('per_page'));

  const inputValue = e.target.elements.searchQuery.value;

  if (inputValue !== api.searchParams.get('q')) {
    api.clearPage();
  }

  api.searchParams.set('q', inputValue);

  await api.fetchImage().then(data => {
    if (api.searchParams.get('q') !== api.searchParams.get('q')) {
      refs.gallery.innerHTML = '';
      successNotification(api.searchParams.get('per_page'));
    }

    renderingMarkup(makeMarkup(data.hits));

    api.maxPage = Math.round(data.totalHits / api.searchParams.get('per_page'));
    if (api.page >= api.maxPage) {
      refs.loadMoreBtn.classList.remove('visible');
    } else {
      refs.loadMoreBtn.classList.add('visible');
    }
  });

  const gallery = new SimpleLightbox('.gallery a');
});

refs.loadMoreBtn.addEventListener('click', async () => {
  await api.fetchImage().then(data => {
    api.maxPage = Math.round(data.totalHits / api.searchParams.get('per_page'));

    if (api.page >= api.maxPage) {
      return maxPageNotification();
    }
    addedMoreImageCard(makeMarkup(data.hits));
  });

  const gallery = new SimpleLightbox('.gallery a');
  gallery.refresh();
});

function renderingMarkup(markup) {
  refs.gallery.innerHTML = markup;
}

function addedMoreImageCard(markup) {
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function maxPageNotification() {
  return Notify.info(
    "We're sorry, but you've reached the end of search results."
  );
}

function successNotification(totalHits) {
  return Notify.success(`Hooray! We found ${totalHits} images.`);
}
// refs.form.addEventListener('submit', async e => {
//   e.preventDefault();
//   const value = refs.input.value;
//   api.q = value;
//   await api.getImages().then(data => {
//     makeMarkup(data);
//     refs.gallery.innerHTML = makeMarkup(data);
//     refs.loadMoreBtn.classList.remove('disabled');
//   });
// });

// refs.loadMoreBtn.addEventListener('click', loadMorePhotos);
// const lightbox = new SimpleLightbox('.gallery a');

// function loadMorePhotos(event) {
//   api.addPage();
//   api.getImages().then(r => {
//     refs.gallery.insertAdjacentHTML('beforeend', makeMarkup(r));
//     const gallery = new SimpleLightbox('.gallery a');
//     lightbox.refresh();
//   });
// }

// function totalHits(totalHits) {
//   return Notify.success(`Hooray! We found ${totalHits} images.`);
// }

// simplelightbox сделать;
// скрыть кнопку, если мало фото
// нотификации
