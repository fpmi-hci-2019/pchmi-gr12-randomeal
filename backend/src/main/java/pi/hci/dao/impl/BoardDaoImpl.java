package pi.hci.dao.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;
import pi.hci.dao.BoardDao;
import pi.hci.dto.BoardDto;

import java.util.List;

@Component
@RequiredArgsConstructor
public class BoardDaoImpl implements BoardDao {
    private final String SELECT_ALL_BOARDS_FOR_USER = "SELECT * FROM USERS_BOARDS ub INNER JOIN BOARDS b ON ub.board_id=b.id" +
            " WHERE user_id=(:user_id)";

    private final NamedParameterJdbcTemplate jdbcTemplate;

    @Override
    public List<BoardDto> getAllBoardsForUser(Long userId) {
        MapSqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("user_id", userId);

        return jdbcTemplate.query(SELECT_ALL_BOARDS_FOR_USER, parameters, (rs, rowNum) ->
                new BoardDto()
                        .setCreatedAt(rs.getDate("created_at"))
                        .setName(rs.getString("name"))
        );
    }
}
