package pi.hci.dao.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;
import pi.hci.dao.DishDao;
import pi.hci.dto.DishDto;

import java.util.Collections;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DishDaoImpl implements DishDao {
    private final String SELECT_ALL_DISHES_BY_BOARD = "SELECT * FROM DISHES d INNER JOIN BOARDS_DISHES bd ON d.id=bd.dish_id where board_id=(:board_id)";
    private final String SELECT_DISH_BY_DISH_ID = "SELECT * FROM DISHES where dish_id=(:dish_id)";

    private final NamedParameterJdbcTemplate jdbcTemplate;

    @Override
    public List<DishDto> getAllDishesForBoard(int boardId) {
        MapSqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("board_id", boardId);

        try {
            return jdbcTemplate.query(SELECT_ALL_DISHES_BY_BOARD, parameters, (rs, rowNum) ->
                    new DishDto()
                            .setId(rs.getInt("id"))
                            .setName(rs.getString("name"))
                            .setCategory(rs.getString("category"))
                            .setDescription(rs.getString("description"))
                            .setMealTypeMask(rs.getBytes("meal_type_mask"))
                            .setPhotoUrl(rs.getString("photo_url"))
                            .setCookingTime(rs.getInt("cooking_time"))
                            .setComplexity(rs.getString("complexity"))
            );
        } catch (Exception ex) {
            log.debug("Unexpected exception: {}", ex.getMessage());
            return Collections.emptyList();
        }
    }

    @Override
    public DishDto getDishByDishId(int dishId) {
        MapSqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("dish_id", dishId);

        return jdbcTemplate.queryForObject(SELECT_DISH_BY_DISH_ID, parameters, (rs, rowNum) ->
                new DishDto()
                        .setId(rs.getInt("id"))
                        .setName(rs.getString("name"))
                        .setCategory(rs.getString("category"))
                        .setDescription(rs.getString("description"))
                        .setMealTypeMask(rs.getBytes("meal_type_mask"))
                        .setPhotoUrl(rs.getString("photo_url"))
                        .setCookingTime(rs.getInt("cooking_time"))
                        .setComplexity(rs.getString("complexity"))
        );
    }
}
