package pi.hci.dao;

import pi.hci.dto.IngredientDto;

import java.util.List;

public interface IngredientDao {
    List<IngredientDto> getAllIngredientsForDish(int dishId);
}
