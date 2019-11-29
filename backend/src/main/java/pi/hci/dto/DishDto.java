package pi.hci.dto;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class DishDto {
    private int id;
    private String name;
    private String description;
    private String category;
    private byte[] mealTypeMask;
    private String photoUrl;
}
