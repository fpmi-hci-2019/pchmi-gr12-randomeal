package pi.hci.mapper;

import org.mapstruct.Mapper;
import pi.hci.dto.IngredientDto;
import pi.hci.model.Ingredient;

import java.util.List;

@Mapper
public interface IngredientMapper {
    IngredientDto toDto(Ingredient ingredient);

    Ingredient fromDto(IngredientDto dto);

    List<IngredientDto> toDtoList(List<Ingredient> ingredients);

    List<Ingredient> fromDtoList(List<IngredientDto> dto);
}
