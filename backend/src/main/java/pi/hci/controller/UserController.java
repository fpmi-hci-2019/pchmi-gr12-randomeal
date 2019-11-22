package pi.hci.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pi.hci.model.Board;
import pi.hci.model.User;
import pi.hci.model.UserWithPassword;
import pi.hci.service.BoardService;
import pi.hci.service.UserService;

import java.util.List;

@RestController
@RequestMapping("v1/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;
    private final BoardService boardService;

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public ResponseEntity<User> createUser(@RequestBody User user) {
        try {
            userService.createUser(user);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ResponseEntity<List<User>> getUsersList() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<User> login(@RequestBody UserWithPassword user) {
        try {
            User loggedUser = userService.login(user);
            return new ResponseEntity<>(loggedUser, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/{userId}/boards", method = RequestMethod.GET)
    public ResponseEntity<List<Board>> getAllBoardsForUser(@PathVariable Long userId) {
        return new ResponseEntity<>(boardService.getAllBoardsForUser(userId), HttpStatus.OK);
    }
}

