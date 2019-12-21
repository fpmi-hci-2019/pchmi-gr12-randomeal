package pi.hci.mapper;

import org.mapstruct.Mapper;
import pi.hci.dto.DishDto;
import pi.hci.model.Dish;
import pi.hci.model.DishWithIngredients;

import java.util.List;

@Mapper
public interface DishMapper {
    DishDto toDto(Dish dish);

    DishWithIngredients fromDto(DishDto dto);

    List<DishDto> toDtoList(List<Dish> dishes);

    List<Dish> fromDtoList(List<DishDto> dto);

    DishDto toDtoWithIngredients(DishWithIngredients dish);

    List<DishDto> toDtoListWithIngredients(List<DishWithIngredients> dishes);

    List<DishWithIngredients> fromDtoListWithIngredients(List<DishDto> dto);
}
