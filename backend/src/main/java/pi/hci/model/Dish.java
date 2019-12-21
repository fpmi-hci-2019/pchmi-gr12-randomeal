package pi.hci.model;

import lombok.Data;
import lombok.experimental.Accessors;
import pi.hci.model.enums.DishComplexityType;

import javax.validation.constraints.NotNull;

@Data
@Accessors(chain = true)
public class Dish {
    private int id;
    @NotNull
    private String name;
    @NotNull
    private String description;
    @NotNull
    private String category;
    @NotNull
    private byte[] mealTypeMask;
    private String photoUrl;
    private DishComplexityType complexity;
    private int cookingTime;
}
