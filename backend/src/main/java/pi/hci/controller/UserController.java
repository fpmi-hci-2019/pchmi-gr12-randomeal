package pi.hci.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import pi.hci.model.Id;
import pi.hci.model.User;
import pi.hci.model.UserWithPassword;
import pi.hci.service.UserService;

import java.util.List;

@RestController
@RequestMapping("randomeal/v1/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public ResponseEntity<Id> createUser(@RequestBody User user) {
        try {
            Id created = userService.createUser(user);
            log.debug("User <id={}> created.", created.getId());
            return new ResponseEntity<>(created, HttpStatus.CREATED);
        } catch (Exception ex) {
            log.debug("Exception while creating new user: {}", ex.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Can't create user.", ex);
        }
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ResponseEntity<List<User>> getUsersList() {
        try {
            List<User> users = userService.getAllUsers();
            log.debug("All users: {}.", users);
            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception ex) {
            log.debug("Exception while getting all users: {}.", ex.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Getting all users failed.", ex);
        }
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<User> login(@RequestBody UserWithPassword user) {
        try {
            User loggedUser = userService.login(user);
            log.debug("User {} successfully logged in.", loggedUser.getUsername());
            return new ResponseEntity<>(loggedUser, HttpStatus.OK);
        } catch (Exception ex) {
            log.debug("Login failed: {}", ex.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Login failed.", ex);
        }
    }
}

