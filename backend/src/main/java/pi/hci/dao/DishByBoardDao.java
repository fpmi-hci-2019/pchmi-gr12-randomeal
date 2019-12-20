package pi.hci.dao;

public interface DishByBoardDao {
    int deleteDish(int boardId, int dishId);

    int addDishOnBoard(int boardId, int dishId);
}
