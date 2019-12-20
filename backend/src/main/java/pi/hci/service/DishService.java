package pi.hci.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pi.hci.dao.DishDao;
import pi.hci.dao.IngredientDao;
import pi.hci.mapper.DishMapper;
import pi.hci.mapper.IngredientMapper;
import pi.hci.model.Dish;
import pi.hci.model.DishWithIngredients;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class DishService {

    private final DishDao dishDao;
    private final IngredientDao ingredientDao;
    private final DishMapper mapper;
    private final IngredientMapper ingredientMapper;

    public List<Dish> getAllDishesForBoard(int boardId) {
        return mapper.fromDtoList(dishDao.getAllDishesForBoard(boardId));
    }

    public List<Dish> getAllDishes() {
        return mapper.fromDtoList(dishDao.getAllDishes());
    }

    @Transactional
    public DishWithIngredients getDishById(int dishId) {
        log.debug("Getting dish by id {}", dishId);
        DishWithIngredients dishWithIngredients = mapper.fromDto(dishDao.getDishByDishId(dishId));
        dishWithIngredients.setIngredients(ingredientMapper.fromDtoList(ingredientDao.getAllIngredientsForDish(dishId)));
        return dishWithIngredients;
    }
}
