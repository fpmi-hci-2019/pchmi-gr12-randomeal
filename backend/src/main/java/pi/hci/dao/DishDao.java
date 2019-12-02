package pi.hci.dao;

import pi.hci.dto.DishDto;

import java.util.List;

public interface DishDao {
    List<DishDto> getAllDishesForBoard(int boardId);

    DishDto getDishByDishId(int dishId);
}
