export default function Recipe({ children }) {
  // if (!recipe.id) {
  //   return (
  //     <Message text='Start by searching for a recipe or an ingredient. Have fun!' />
  //   )
  // }

  return <div className='recipe'>{children}</div>
}
