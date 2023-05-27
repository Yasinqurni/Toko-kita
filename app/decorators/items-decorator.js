const itemDecoratorArray = async (item, pagination) => {

  const mappedItem = item.map((data) => {

    return {
      // id_item: data.id,
      name_item: data.name_item,
      category: data.category,
      description: data.item_description,
      price: data.price,
      quantity: data.quantity,
      images: data.images.map((image) => {
        return {
          image_id: image.id,
          url: image.url
        }
      }),
      // totalItems: pagination.totalItems,
      // currentPage: pagination.currentPage,
      // totalPages: pagination.totalPages
    }
  })
  return await Promise.all(mappedItem)
}


const itemDecoratorObject = (item) => {

  const mappingImage = item.images.map((image) => {
    return {
      image_id: image.id,
      url: image.url
    }
  })

  const mappedItem = {
    // id_item: item.id,
    name_item: item.name_item,
    category: data.category,
    category_name: item.category.category_name,
    Description: item.item_description,
    price: item.price,
    quantity: item.quantity,
    images: mappingImage
  }
  return mappedItem
}

module.exports = {
  itemDecoratorArray,
  itemDecoratorObject
}
