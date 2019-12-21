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
    private final String SELECT_ALL_BOARDS_FOR_USER = "SELECT * FROM BOARDS WHERE user_id=(:user_id)";
    private final String SELECT_ALL_FAVOURITE_BOARDS_FOR_USER = SELECT_ALL_BOARDS_FOR_USER + " and is_favourite=TRUE";
    private final String DELETE_BOARD = "DELETE FROM BOARDS WHERE id=(:id)";
    private final String INSERT_BOARD = "INSERT INTO BOARDS (name, user_id) VALUES (:name, :user_id)";
    private final String SELECT_BOARD_IS_FAV = "SELECT is_favourite FROM BOARDS WHERE id=(:id)";
    private final String SET_BOARD_IS_FAV = "UPDATE BOARDS SET is_favourite=(:is_fav), changed_at=(:changed_at) WHERE id=(:id)";
    private final String SELECT_BOARD_BY_ID = "SELECT * FROM BOARDS WHERE id=(:id)";

    private final NamedParameterJdbcTemplate jdbcTemplate;

    @Override
    public List<BoardDto> getAllBoardsForUser(int userId, String filterBy) {
        boolean onlyFav = filterBy != null && filterBy.equals("fav");
        MapSqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("user_id", userId);

        return jdbcTemplate.query(onlyFav ? SELECT_ALL_FAVOURITE_BOARDS_FOR_USER : SELECT_ALL_BOARDS_FOR_USER, parameters, (rs, rowNum) ->
                new BoardDto()
                        .setId(rs.getInt("id"))
                        .setCreatedAt(rs.getTimestamp("created_at"))
                        .setName(rs.getString("name"))
                        .setChangedAt(rs.getTimestamp("changed_at"))
                        .setFavourite(rs.getBoolean("is_favourite"))
                        .setUserId(rs.getInt("user_id"))
        );
    }

    @Override
    public BoardDto getBoardById(int boardId) {
        MapSqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("id", boardId);

        return jdbcTemplate.queryForObject(SELECT_BOARD_BY_ID, parameters, (rs, rowNum) ->
                new BoardDto()
                        .setId(rs.getInt("id"))
                        .setCreatedAt(rs.getTimestamp("created_at"))
                        .setName(rs.getString("name"))
                        .setChangedAt(rs.getTimestamp("changed_at"))
                        .setFavourite(rs.getBoolean("is_favourite"))
                        .setUserId(rs.getInt("user_id"))
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
                .addValue("name", board.getName())
                .addValue("user_id", board.getUserId());

        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(INSERT_BOARD, parameters, keyHolder, new String[]{"id"});
        return (int) Optional.ofNullable(keyHolder.getKey()).orElse(-1);
    }

    @Override
    public boolean getBoardIsFav(int boardId) {
        MapSqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("id", boardId);

        return jdbcTemplate.queryForObject(SELECT_BOARD_IS_FAV, parameters, Boolean.class);
    }

    @Override
    public int setBoardIsFav(int boardId, boolean isFav) {
        MapSqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("id", boardId)
                .addValue("is_fav", isFav)
                .addValue("changed_at", Timestamp.valueOf(LocalDateTime.now()));

        return jdbcTemplate.update(SET_BOARD_IS_FAV, parameters);
    }
}
