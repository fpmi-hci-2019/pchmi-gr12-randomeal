package pi.hci.dao.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;
import pi.hci.dao.UserDao;
import pi.hci.dto.UserDto;

@Component
@RequiredArgsConstructor
public class UserDaoImpl implements UserDao {
    private final String INSERT_USER_QUERY = "INSERT INTO USERS (email, username, password) " +
            "VALUES (:email, :username, :password)";

    private final NamedParameterJdbcTemplate jdbcTemplate;

    @Override
    public int createUser(UserDto user) {
        MapSqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("email", user.getEmail())
                .addValue("username", user.getUsername())
                .addValue("password", user.getPassword());

        return jdbcTemplate.update(INSERT_USER_QUERY, parameters);
    }

}
