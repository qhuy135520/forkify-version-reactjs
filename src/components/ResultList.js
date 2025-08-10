import Preview from './Preview'

// components/ResultList.js
export default function ResultList({
  resultPerPage,
  choseRecipeId,
  onChoseRecipeId,
}) {
  if (!resultPerPage) {
    return (
      <ul className='results'>
        <div className='message'>
          <div>
            <svg>
              <use href='assets/images/icons.svg#icon-smile'></use>
            </svg>
          </div>
          <p>Start by searching for a recipe or an ingredient.</p>
        </div>
      </ul>
    )
  }

  return (
    <ul className='results'>
      {resultPerPage.map((recipe, index) => (
        <Preview
          choseRecipeId={choseRecipeId}
          key={index}
          recipe={recipe}
          onChoseRecipeId={onChoseRecipeId}
        />
      ))}
    </ul>
  )
}
