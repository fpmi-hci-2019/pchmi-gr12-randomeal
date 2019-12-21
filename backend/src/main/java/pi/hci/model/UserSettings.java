package pi.hci.model;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class UserSettings {
    private double weight;
    private double height;
    private double physicalActivity;
    private double targetWeight;
}
