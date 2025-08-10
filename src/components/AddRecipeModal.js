import { useState } from 'react'
import Input from './Input'
import { API_URL, KEY } from '../utils/config'
import { createRecipeObject } from '../utils/createRecipeObject'
import { sendRequest } from '../utils/api'
import Error from '../components/Error'
import Message from './Message'

export default function AddRecipeModal({
  isOpenModal,
  setIsOpenModal,
  onAddBookmarks,
}) {
  const [recipeInput, setRecipeInput] = useState({
    title: 'TEST23',
    sourceUrl: 'TEST23',
    image: 'TEST23',
    publisher: 'TEST23',
    cookingTime: '23',
    servings: '23',
    ingredients: [
      '0.5,kg,Rice',
      '1,,Avocado',
      ',,salt',
      '0.5,kg,Rice',
      '0.5,kg,Rice',
      '0.5,kg,Rice',
    ],
  })

  const [isInvalid, setIsInvalid] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  function handleChange(e) {
    const formInput = { ...recipeInput }
    formInput[e.target.name] = e.target.value
    setRecipeInput(formInput)
  }

  function handleChangeIngredient(e) {
    const formInput = { ...recipeInput }
    formInput.ingredients[e.target.name] = e.target.value
    setRecipeInput(formInput)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const ingredients = Object.entries(recipeInput.ingredients)
        // .filter((entry) => entry[0].startsWith('ingredient') && entry[1] !== '')

        .map((ing) => {
          const ingArr = ing[1].split(',').map((el) => el.trim())
          if (ingArr.length !== 3) setIsInvalid(true)

          const [quantity, unit, description] = ingArr
          return { quantity: quantity ? +quantity : null, unit, description }
        })
      const recipe = {
        title: recipeInput.title,
        source_url: recipeInput.sourceUrl,
        image_url: recipeInput.image,
        publisher: recipeInput.publisher,
        cooking_time: +recipeInput.cookingTime,
        servings: +recipeInput.servings,
        ingredients,
      }

      const data = await sendRequest({
        url: `${API_URL}/?key=${KEY}`,
        body: recipe,
        method: 'POST',
      })

      setIsSuccess(true)
      setTimeout(async () => {
        await setIsOpenModal(false)
        setIsSuccess(false)
      }, 3000)
    } catch (err) {
      setIsInvalid(true)
      setTimeout(async () => {
        await setIsOpenModal(false)
        setIsInvalid(false)
      }, 3000)
    }
  }

  if (isInvalid) {
    return (
      <div className={`add-recipe-window ${!isOpenModal ? 'hidden' : ''}`}>
        <button
          className='btn--close-modal'
          onClick={() => setIsOpenModal(false)}
        >
          &times;
        </button>
        <Error
          text={`'Wrong ingredient format! Please use the correct format :)'`}
        />
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className={`add-recipe-window ${!isOpenModal ? 'hidden' : ''}`}>
        <Message text={'Recipe was successfully uploaded :)'} />
      </div>
    )
  }

  return (
    <div className={`add-recipe-window ${!isOpenModal ? 'hidden' : ''}`}>
      <button
        className='btn--close-modal'
        onClick={() => setIsOpenModal(false)}
      >
        &times;
      </button>
      <form className='upload' onSubmit={(e) => handleSubmit(e)}>
        <div className='upload__column'>
          <h3 className='upload__heading'>Recipe data</h3>
          <Input
            title='Title'
            value={recipeInput.title}
            name='title'
            type='text'
            handleChange={handleChange}
          />
          <Input
            title='URL'
            value={recipeInput.sourceUrl}
            name='sourceUrl'
            type='text'
            handleChange={handleChange}
          />
          <Input
            title='Image URL'
            value={recipeInput.image}
            name='image'
            type='text'
            handleChange={handleChange}
          />
          <Input
            title='Publisher'
            value={recipeInput.publisher}
            name='publisher'
            type='text'
            handleChange={handleChange}
          />
          <Input
            title='Prep time'
            value={recipeInput.cookingTime}
            name='cookingTime'
            type='number'
            handleChange={handleChange}
          />
          <Input
            title='Servings'
            value={recipeInput.servings}
            name='servings'
            type='number'
            handleChange={handleChange}
          />
        </div>

        <div className='upload__column'>
          <h3 className='upload__heading'>Ingredients</h3>
          <Input
            title='Ingredient 1'
            value={recipeInput.ingredients[0]}
            name='0'
            type='text'
            handleChange={handleChangeIngredient}
          />
          <Input
            title='Ingredient 2'
            value={recipeInput.ingredients[1]}
            name='1'
            type='text'
            handleChange={handleChangeIngredient}
          />
          <Input
            title='Ingredient 3'
            value={recipeInput.ingredients[2]}
            name='2'
            type='text'
            handleChange={handleChangeIngredient}
          />
          <Input
            title='Ingredient 4'
            value={recipeInput.ingredients[3]}
            name='3'
            type='text'
            handleChange={handleChangeIngredient}
          />
          <Input
            title='Ingredient 5'
            value={recipeInput.ingredients[4]}
            name='4'
            type='text'
            handleChange={handleChangeIngredient}
          />
          <Input
            title='Ingredient 6'
            value={recipeInput.ingredients[5]}
            name='5'
            type='text'
            handleChange={handleChangeIngredient}
          />
        </div>
        <button className='btn upload__btn'>
          <svg>
            <use href='assets/images/icons.svg#icon-upload-cloud'></use>
          </svg>
          <span>Upload</span>
        </button>
      </form>
    </div>
  )
}
