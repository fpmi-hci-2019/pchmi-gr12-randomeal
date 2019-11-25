package pi.hci.model;

import lombok.Data;
import lombok.experimental.Accessors;

import javax.validation.constraints.NotNull;

@Data
@Accessors(chain = true)
public class Ingredient {
    private int id;
    @NotNull
    private String name;
    @NotNull
    private int calories;
}
