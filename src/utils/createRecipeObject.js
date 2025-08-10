export function createRecipeObject(data) {
  let { recipe } = data.data
  return (recipe = {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    ingredients: recipe.ingredients,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    image: recipe.image_url,
    source: recipe.source_url,
    ...(recipe.key && { key: recipe.key }),
  })
}
