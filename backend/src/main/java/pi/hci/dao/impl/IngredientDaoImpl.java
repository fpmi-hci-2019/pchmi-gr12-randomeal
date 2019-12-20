package pi.hci.dao.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;
import pi.hci.dao.IngredientDao;
import pi.hci.dto.IngredientDto;

import java.util.List;

@Component
@RequiredArgsConstructor
public class IngredientDaoImpl implements IngredientDao {
    private final String SELECT_ALL_INGREDIENTS_BY_DISH = "SELECT * FROM INGREDIENTS i INNER JOIN DISH_COMPONENTS dc ON i.id=dc.ingredient_id where dish_id=(:dish_id)";

    private final NamedParameterJdbcTemplate jdbcTemplate;

    @Override
    public List<IngredientDto> getAllIngredientsForDish(int dishId) {
        MapSqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("dish_id", dishId);

        return jdbcTemplate.query(SELECT_ALL_INGREDIENTS_BY_DISH, parameters, (rs, rowNum) ->
                new IngredientDto()
                        .setId(rs.getInt("id"))
                        .setName(rs.getString("name"))
                        .setCalories(rs.getInt("calories"))
                        .setWeight(rs.getDouble("weight"))
        );
    }
}
