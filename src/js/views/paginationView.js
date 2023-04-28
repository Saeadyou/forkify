import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton(curPage + 1, false);
    }
    // Last page
    if (curPage === numPages) {
      return this._generateMarkupButton(curPage - 1);
    }
    // Other pages
    if (curPage > 1 && curPage < numPages) {
      return (
        this._generateMarkupButton(curPage - 1) +
        this._generateMarkupButton(curPage + 1, false)
      );
    }

    // Page 1, and there are NOT other pages
    if (numPages === 1) return '';
  }

  _generateMarkupButton(button, prev = true) {
    if (prev) {
      return ` 
        <button data-goto="${button}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${button}</span>
        </button>
      `;
    } else {
      return ` 
        <button data-goto="${button}" class="btn--inline pagination__btn--next">
          <span>Page ${button}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
}

export default new PaginationView();
