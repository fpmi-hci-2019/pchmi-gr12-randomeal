package pi.hci.dto;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class IngredientDto {
    private int id;
    private String name;
    private int calories;
    private double weight;
}
