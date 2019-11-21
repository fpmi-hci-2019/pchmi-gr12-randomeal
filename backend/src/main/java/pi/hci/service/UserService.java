package pi.hci.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import pi.hci.dao.UserDao;
import pi.hci.dto.UserDto;
import pi.hci.mapper.UserMapper;
import pi.hci.model.User;
import pi.hci.utils.auth.AuthenticationUtils;

import java.nio.charset.Charset;
import java.security.spec.InvalidKeySpecException;
import java.util.Random;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {

    private final AuthenticationUtils authenticationUtils;
    private final UserDao userDao;
    private final UserMapper mapper;

    public int createUser(User user) {
        String password = generatePassword();
        UserDto userDto = mapper.toDto(user);
        userDto.setPassword(password);
        log.debug("Saving user <" + user.getUsername() + "> <" + password + ">.");
        return userDao.createUser(userDto);
    }

    private String generatePassword() {
        String password = generateRandomString();
        String salt = authenticationUtils.generateSalt(30);
        String secureUserPassword;

        try {
            secureUserPassword = authenticationUtils.generateSecurePassword(password, salt);
        } catch (InvalidKeySpecException ex) {
            throw new IllegalArgumentException(ex.getLocalizedMessage());
        }

        return secureUserPassword;
    }

    private String generateRandomString() {
        byte[] array = new byte[20];
        new Random().nextBytes(array);
        return new String(array, Charset.forName("UTF-8"));
    }
}

   /* public User loginByEmail(User user) {
        return userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword()).orElse(null);
    }

    public User loginByUsername(User user) {
        return userRepository.findByUsernameAndPassword(user.getUsername(), user.getPassword()).orElse(null);
    }

    public User changeUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }*l/
} */
