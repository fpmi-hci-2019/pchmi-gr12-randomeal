package pi.hci.dao.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Component;
import pi.hci.dao.UserDao;
import pi.hci.dto.UserDto;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class UserDaoImpl implements UserDao {
    private final String INSERT_USER = "INSERT INTO USERS (email, username, password) " +
            "VALUES (:email, :username, :password)";
    private final String SELECT_ALL_USERS = "SELECT * FROM USERS";
    private final String FIND_BY_EMAIL_AND_PASSWORD = "SELECT * FROM USERS WHERE email=(:email) and password=(:password)";

    private final NamedParameterJdbcTemplate jdbcTemplate;

    @Override
    public int createUser(UserDto user) {
        MapSqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("email", user.getEmail())
                .addValue("username", user.getUsername())
                .addValue("password", user.getPassword());

        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(INSERT_USER, parameters, keyHolder, new String[]{"id"});
        return (int) Optional.of(keyHolder.getKey()).orElse(-1);
    }

    public UserDto login(UserDto user) {
        MapSqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("email", user.getEmail())
                .addValue("password", user.getPassword());

        return jdbcTemplate.queryForObject(FIND_BY_EMAIL_AND_PASSWORD, parameters, (rs, rowNum) ->
                new UserDto()
                        .setId(rs.getLong("id"))
                        .setUsername(rs.getString("username"))
                        .setEmail(rs.getString("email"))
                        .setBirthDate(rs.getDate("birthdate"))
                        .setGender(rs.getString("gender")));
    }

    @Override
    public List<UserDto> getAllUsers() {
        return jdbcTemplate.query(SELECT_ALL_USERS, (rs, rowNum) ->
                new UserDto()
                        .setId(rs.getLong("id"))
                        .setUsername(rs.getString("username"))
                        .setEmail(rs.getString("email"))
                        .setBirthDate(rs.getDate("birthdate"))
                        .setGender(rs.getString("gender")));
    }

}
