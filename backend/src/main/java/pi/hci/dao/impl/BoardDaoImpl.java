package pi.hci.dao.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Component;
import pi.hci.dao.BoardDao;
import pi.hci.dto.BoardDto;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class BoardDaoImpl implements BoardDao {
    private final String SELECT_ALL_BOARDS_FOR_USER = "SELECT * FROM USERS_BOARDS ub INNER JOIN BOARDS b ON ub.board_id=b.id" +
            " WHERE user_id=(:user_id)";
    private final String SELECT_ALL_FAVOURITE_BOARDS_FOR_USER = SELECT_ALL_BOARDS_FOR_USER + " and is_favourite=TRUE";
    private final String DELETE_BOARD = "DELETE FROM BOARDS WHERE id=(:id)";
    private final String INSERT_BOARD = "INSERT INTO BOARDS (name) VALUES (:name)";
    private final String INSERT_USER_BOARD = "INSERT INTO USERS_BOARDS (user_id, board_id) VALUES (:user_id, :board_id)";
    private final String SELECT_BOARD_IS_FAV = "SELECT is_favourite FROM USERS_BOARDS WHERE user_id=(:user_id) and board_id=(:board_id)";
    private final String SET_BOARD_IS_FAV = "UPDATE USERS_BOARDS SET is_favourite=(:is_fav), changed_at=(:changed_at) WHERE user_id=(:user_id) and board_id=(:board_id)";

    private final NamedParameterJdbcTemplate jdbcTemplate;

    @Override
    public List<BoardDto> getAllBoardsForUser(Long userId) {
        MapSqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("user_id", userId);

        return jdbcTemplate.query(SELECT_ALL_FAVOURITE_BOARDS_FOR_USER, parameters, (rs, rowNum) ->
                new BoardDto()
                        .setCreatedAt(rs.getDate("created_at"))
                        .setName(rs.getString("name"))
        );
    }

    @Override
    public int deleteBoard(int boardId) {
        MapSqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("id", boardId);

        return jdbcTemplate.update(DELETE_BOARD, parameters);
    }

    @Override
    public int createBoard(BoardDto board) {
        MapSqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("name", board.getName());

        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(INSERT_BOARD, parameters, keyHolder, new String[]{"id"});
        return (int) Optional.ofNullable(keyHolder.getKey()).orElse(-1);
    }

    @Override
    public int createUserBoard(int boardId, Long userId) {
        MapSqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("user_id", userId)
                .addValue("board_id", boardId);

        return jdbcTemplate.update(INSERT_USER_BOARD, parameters);
    }

    @Override
    public boolean getBoardIsFav(int boardId, Long userId) {
        MapSqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("user_id", userId)
                .addValue("board_id", boardId);

        return jdbcTemplate.queryForObject(SELECT_BOARD_IS_FAV, parameters, Boolean.class);
    }

    @Override
    public int setBoardIsFav(int boardId, Long userId, boolean isFav) {
        MapSqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("user_id", userId)
                .addValue("board_id", boardId)
                .addValue("is_fav", isFav)
                .addValue("changed_at", Timestamp.valueOf(LocalDateTime.now()));

        return jdbcTemplate.update(SET_BOARD_IS_FAV, parameters);
    }
}
