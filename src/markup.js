// webformatURL - ссылка на маленькое изображение для списка карточек.
// largeImageURL - ссылка на большое изображение.
// tags - строка с описанием изображения. Подойдет для атрибута alt.
// likes - количество лайков.
// views - количество просмотров.
// comments - количество комментариев.
// downloads - количество загрузок.

export function makeMarkup(data) {
  return data
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<a class="photo-link" href="${largeImageURL}">
                        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                        <div class="info">
                            <p class="info-item">
                                <b>Likes</b>
                                </br>${likes}
                            </p>
                            <p class="info-item">
                                <b>Views</b>
                                </br>${views}
                            </p>
                            <p class="info-item">
                                <b>Comments</b>
                                </br>${comments}
                            </p>
                            <p class="info-item">
                                <b>Downloads</b>
                                </br>${downloads}
                            </p>
                        </div>
                    </a>`;
      }
    )
    .join('');
}
