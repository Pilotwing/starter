import View from './View';
import icons from 'url:../../img/icons.svg'; //parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton(curPage, 'right');
    }

    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton(curPage, 'left');
    }

    if (curPage < numPages) {
      return this._generateMarkupButton(curPage, 'left').concat(
        this._generateMarkupButton(curPage, 'right')
      );
    }

    return ``;
  }

  _generateMarkupButton(curPage, dir) {
    return `
    <button data-goto="${
      dir === 'right' ? curPage + 1 : curPage - 1
    }" class="btn--inline pagination__btn--${
      dir === 'right' ? 'next' : 'prev'
    }">
    <span>Page ${dir === 'right' ? curPage + 1 : curPage - 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-${dir}"></use>
    </svg>
  </button>
  `;
  }
}

export default new PaginationView();
