package pi.hci.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import pi.hci.model.Dish;
import pi.hci.model.DishWithIngredients;
import pi.hci.service.DishService;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("randomeal/v1/dishes")
@RequiredArgsConstructor
public class DishesController {
    private final DishService dishService;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public ResponseEntity<List<Dish>> getAllDishes() {
        try {
            List<Dish> dishes = dishService.getAllDishes();
            log.debug("All dishes : {}.", dishes);
            return new ResponseEntity<>(dishes, HttpStatus.OK);
        } catch (Exception ex) {
            log.debug("Exception while getting all dishes: {}.", ex.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Getting all dishes failed.", ex);
        }
    }

    @RequestMapping(value = "/{dishId}", method = RequestMethod.GET)
    public ResponseEntity<DishWithIngredients> getDish(@PathVariable int dishId) {
        try {
            DishWithIngredients dish = dishService.getDishById(dishId);
            log.debug("Returned dish: {}", dish);
            return new ResponseEntity<>(dish, HttpStatus.OK);
        } catch (Exception ex) {
            log.debug("Exception while getting the dish<id={}>: {}", dishId, ex.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Can't get the dish: " + dishId, ex);
        }
    }
}
