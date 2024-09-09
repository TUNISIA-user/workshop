app.get("/removeItem/:userId/:itemId", async (req, res) => {
  const { userId, itemId } = req.params;  // Get the userId and itemId from the route parameters

  try {
    // Find the user by their ID
    const user = await Users.findById(userId);
    
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Filter out the item from the user's basket
    const updatedBasket = user.basket.filter(item => item.id !== itemId);

    // Check if the item was in the basket
    if (user.basket.length === updatedBasket.length) {
      return res.status(404).send('Item not found in basket');
    }

    // Update the user's basket with the new filtered basket
    user.basket = updatedBasket;

    // Save the updated user document to persist the changes in the database
    await user.save();

    res.status(200).send({ message: "Item removed successfully", basket: user.basket });
  } catch (error) {
    console.log(`Error removing item: ${error}`);
    res.status(500).send('Error removing item');
  }
});
