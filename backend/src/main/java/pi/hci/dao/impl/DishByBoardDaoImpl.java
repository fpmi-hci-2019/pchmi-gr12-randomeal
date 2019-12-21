package pi.hci.dao.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;
import pi.hci.dao.DishByBoardDao;

@Component
@RequiredArgsConstructor
public class DishByBoardDaoImpl implements DishByBoardDao {
    private final String DELETE_DISH_FROM_BOARD = "DELETE FROM BOARDS_DISHES WHERE board_id=(:board_id) and dish_id=(:dish_id)";
    private final String ADD_DISH_ON_BOARD = "INSERT INTO BOARDS_DISHES VALUES (:dish_id, :board_id)";

    private final NamedParameterJdbcTemplate jdbcTemplate;

    @Override
    public int deleteDish(int boardId, int dishId) {
        MapSqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("board_id", boardId)
                .addValue("dish_id", dishId);

        return jdbcTemplate.update(DELETE_DISH_FROM_BOARD, parameters);
    }

    @Override
    public int addDishOnBoard(int boardId, int dishId) {
        MapSqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("board_id", boardId)
                .addValue("dish_id", dishId);

        return jdbcTemplate.update(ADD_DISH_ON_BOARD, parameters);
    }
}
