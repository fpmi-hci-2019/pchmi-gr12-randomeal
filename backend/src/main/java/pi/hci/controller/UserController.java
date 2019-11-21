package pi.hci.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import pi.hci.model.User;
import pi.hci.service.UserService;

@RestController
@RequestMapping("v1/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public ResponseEntity<User> createUser(@RequestBody User user) {
        try {
            userService.createUser(user);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }
}

